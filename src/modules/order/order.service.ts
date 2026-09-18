import { prisma } from "../../config/prisma.js";
import { orderRepository } from "./order.repository.js";

export const getOrders = async (
  page = 1,
  limit = 10,
) => {
  return orderRepository.paginate({
    page,
    limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrderById = async (id: number) => {
  return orderRepository.findOrderById(id);
};

export const createOrder = async (
  userId: number,
  items: {
    productId: number;
    quantity: number;
  }[],
) => {
  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one product");
  }

  for (const item of items) {
    if (item.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.deletedAt) {
    throw new Error("User not found");
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },
      deletedAt: null,
    },
  });

  if (products.length !== items.length) {
    throw new Error("One or more products not found");
  }

  return orderRepository.create({
    user: {
      connect: {
        id: userId,
      },
    },

    items: {
      create: items.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId,
        );

        if (!product) {
          throw new Error("Product not found");
        }

        return {
          quantity: item.quantity,
          price: product.price,

          product: {
            connect: {
              id: product.id,
            },
          },
        };
      }),
    },
  });
};

export const checkout = async (
  userId: number,
  items: {
    productId: number;
    quantity: number;
  }[],
) => {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  for (const item of items) {
    if (item.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.deletedAt) {
      throw new Error("User not found");
    }

    const productIds = items.map((item) => item.productId);

    const uniqueProductIds = [...new Set(productIds)];

    if (uniqueProductIds.length !== productIds.length) {
      throw new Error("Duplicate products are not allowed");
    }

    const products = await tx.product.findMany({
      where: {
        id: {
          in: uniqueProductIds,
        },
        deletedAt: null,
      },
    });

    if (products.length !== uniqueProductIds.length) {
      throw new Error("One or more products not found");
    }

    for (const item of items) {
      const product = products.find(
        (product) => product.id === item.productId,
      );

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Not enough stock for product ${product.id}`,
        );
      }
    }

    const order = await tx.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },

        items: {
          create: items.map((item) => {
            const product = products.find(
              (product) => product.id === item.productId,
            );

            if (!product) {
              throw new Error("Product not found");
            }

            return {
              quantity: item.quantity,
              price: product.price,

              product: {
                connect: {
                  id: product.id,
                },
              },
            };
          }),
        },
      },

      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  });
};