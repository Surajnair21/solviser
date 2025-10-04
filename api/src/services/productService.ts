import prisma from "../prisma";

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const getProductsByOrg = async (organizationId: string) => {
  return prisma.product.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    include: { createdBy: { select: { id: true, name: true, email: true } } },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { createdBy: { select: { id: true, name: true, email: true } } },
  });
};

export const updateProduct = async (id: string, data: Partial<any>) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string, userId: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isSuperAdmin: true },
  });

  if (!user) throw new Error("User not found");
  if (product.createdById !== userId && !user.isSuperAdmin) {
    throw new Error("Not authorized to delete this product");
  }

  return prisma.product.delete({ where: { id } });
};

export const getAllCategories = async () => {
  return prisma.product.findMany({
    distinct: ["category"],
    select: { category: true },
    where: { category: { not: null } },
    orderBy: { category: "asc" },
  });
};
