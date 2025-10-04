import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { name: "Demo Org" },
    update: {},
    create: { name: "Demo Org" },
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: "hashedpassword",
      isSuperAdmin: true,
      organizationId: org.id,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Eco-friendly Toothbrush",
        description: "Biodegradable toothbrush made of bamboo.",
        category: "Sustainables",
        unit: "piece",
        price: 25,
        stock: 100,
        dimension: "20x5x2 cm",
        organizationId: org.id,
        createdById: user.id,
      },
      {
        name: "Organic Almonds",
        description: "High quality organic almonds.",
        category: "Food",
        unit: "kg",
        price: 800,
        stock: 50,
        dimension: "—",
        organizationId: org.id,
        createdById: user.id,
      },
    ],
  });
}

main()
  .then(() => console.log("✅ Seed data created"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
