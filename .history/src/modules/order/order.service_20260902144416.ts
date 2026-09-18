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
export const checkout = async (
    userId : number ,
    items :{
        productId : number ;
        quantity : number ;
    }
    [
        
    ]
    }
)