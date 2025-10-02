// File: apps/api/src/services/productService.ts
import prisma from '../prisma';

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const getProductsByOrg = async (organizationId: string) => {
  return prisma.product.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    include: { createdBy: true }, // ✅ includes user who created
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { createdBy: true },
  });
};

export const updateProduct = async (id: string, data: Partial<any>) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
