import { prisma } from "../../config/prisma.js";
import { BaseRepository } from "../../repositories/base.repository.js";
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
}

export const orderRepository = new OrderRepository();