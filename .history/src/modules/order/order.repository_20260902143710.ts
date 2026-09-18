import { prisma } from "../../config/prisma.js";
import {
  Order,
  Prisma,
} from "../../generated/prisma/client.js";

export class OrderRepository extends BaseRepository<
  Order,
  number,
  Prisma.OrderCreateInput,
  Prisma.OrderUpdateInput
> {
  constructor() {
    super(prisma.order);
  }

  async findOrderById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

export const orderRepository = new OrderRepository();