import { prisma } from "../../config/prisma.js";
import { orderRepository } from "./order.repository.js";

export const getOrders = async (
        page = 1,
        limit = 10,
        ) => {
            const skip = (page - 1) * limit;

            const [data, total] = await Promise.all([
                prisma.order.findMany({
                skip,
                take: limit,
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
        }),

        prisma.order.count(),
    ]);

    return {
        data,
        meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        },
    };
    };

    export const getOrderById = async (id: number) => {
        return prisma.order.findUnique({
            where: {
            id,
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

export const createOrder = async (
  userId: number,
  items: {
    productId: number;
    quantity: number;
  }[],
) => {
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
        }
    }
)
    }
    })


}
//  checkout 
// Checkout
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

  return prisma.$transaction(async (tx) => {
    // 1. Get products
    const products = await tx.product.findMany({
      where: {
        id: {
          in: items.map((item) => item.productId),
        },
        deletedAt: null,
      },
    });

    // 2. Check all products exist
    if (products.length !== items.length) {
      throw new Error("One or more products not found");
    }

    // 3. Validate stock
    for (const item of items) {
      if (item.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

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

    // 4. Create order
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

    // 5. Decrease stock
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