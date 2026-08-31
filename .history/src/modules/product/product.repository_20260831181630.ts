import { prisma } from "../../config/prisma.js";
import { BaseRepository } from "../../repositories/base.repository.js";

export class ProductRepository extends BaseRepository<
  any,
  number,
  any,
  any
> {
  constructor() {
    super(prisma.product);
  }
}

export const productRepository = new ProductRepository();