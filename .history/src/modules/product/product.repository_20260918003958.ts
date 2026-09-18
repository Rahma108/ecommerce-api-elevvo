import { BaseRepository } from "../../common/repositories/base.repository.js";
import { prisma } from "../../config/prisma.js";
import {
  Product,
  Prisma,
} from "../../generated/prisma/client.js";

export class ProductRepository extends BaseRepository<
  Product,
  number,
  Prisma.ProductCreateInput,
  Prisma.ProductUpdateInput
> {
  constructor() {
    super(prisma.product);
  }
}

export const productRepository = new ProductRepository();