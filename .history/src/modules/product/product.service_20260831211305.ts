import { productRepository } from "./product.repository.js";

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
}) => {
  return productRepository.create({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
  });
};

export const getProducts = async (
  page = 1,
  limit = 10,
  search?: string,
) => {
  const where = {
    deletedAt: null,
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  return productRepository.paginate({
    page,
    limit,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: number) => {
  return productRepository.findById(id);
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
  },
) => {
  return productRepository.update(id, data);
};

export const deleteProduct = async (id: number) => {
  return productRepository.softDelete(id);
};

export const restoreProduct = async (id: number) => {
  return productRepository.restore(id);
};

export const permanentlyDeleteProduct = async (id: number) => {
  return productRepository.hardDelete(id);
};