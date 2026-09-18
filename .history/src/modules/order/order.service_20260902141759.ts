import { prisma } from "../../config/prisma.js";

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