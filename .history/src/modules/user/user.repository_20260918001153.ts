import { BaseRepository } from "../../common/repositories/base.repository.js";
import { prisma } from "../../config/prisma.js";
import {
  User,
  Prisma,
} from "../../generated/prisma/client.js";

export class UserRepository extends BaseRepository<
  User,
  number,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor() {
    super(prisma.user);
  }

  async findActiveById(id: number) {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  }
}

export const userRepository = new UserRepository();