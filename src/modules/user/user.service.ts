import { userRepository } from "./user.repository.js";

export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    role?: "USER" | "ADMIN";
    }) => {
    return userRepository.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? "USER",
    });
    };

    export const getUsers = async (
    page = 1,
    limit = 10,
    ) => {
    return userRepository.paginate({
        page,
        limit,
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

    export const deleteUser = async (id: number) => {
    return userRepository.hardDelete(id);
};