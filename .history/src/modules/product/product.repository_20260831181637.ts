import { BaseRepository } from "../../common/repositories/base.repository.js";
import { prisma } from "../../config/prisma.js";


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