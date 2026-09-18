import { BaseRepository } from "../../common/repositories/base.repository.js";
import { prisma } from "../../config/prisma.js";
import {
  User,
  Prisma,
} from "../../generated/prisma/client.js";

export class AuthRepository extends BaseRepository<
  User,
  number,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export const authRepository = new AuthRepository();