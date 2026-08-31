import { prisma } from "../../config/prisma.js";


export class ProductRepository extends BaseRepositor<
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