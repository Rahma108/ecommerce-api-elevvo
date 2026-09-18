import { productRepository } from "./product.repository.js";

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
}) => {
  if (!data.name) {
    throw new Error("Product name is required");
  }

  if (data.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (data.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

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
  const product = await productRepository.findById(id);

  if (!product || product.deletedAt) {
    return null;
  }

  return product;
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
  const product = await productRepository.findById(id);

  if (!product || product.deletedAt) {
    throw new Error("Product not found");
  }

  if (data.price !== undefined && data.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  return productRepository.update(id, data);
};

export const deleteProduct = async (id: number) => {
  const product = await productRepository.findById(id);

  if (!product || product.deletedAt) {
    throw new Error("Product not found");
  }

  return productRepository.softDelete(id);
};

export const restoreProduct = async (id: number) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (!product.deletedAt) {
    throw new Error("Product is already active");
  }

  return productRepository.restore(id);
};

export const permanentlyDeleteProduct = async (id: number) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return productRepository.hardDelete(id);
};