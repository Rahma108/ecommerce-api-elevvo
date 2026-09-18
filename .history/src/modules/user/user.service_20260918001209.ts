import { userRepository } from "./user.repository.js";

export const getUsers = async (
  page = 1,
  limit = 10,
) => {
  return userRepository.paginate({
    page,
    limit,
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id: number) => {
  return userRepository.findById(id);
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    role?: "USER" | "ADMIN";
  },
) => {
  return userRepository.update(id, data);
};

export const softDeleteUser = async (id: number) => {
  return userRepository.softDelete(id);
};

export const restoreUser = async (id: number) => {
  return userRepository.restore(id);
};

export const hardDeleteUser = async (id: number) => {
  return userRepository.hardDelete(id);
};