import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Janmeru123", 10);

  await prisma.profiles.upsert({
    where: {
      email: "janmeru@example.com",
    },
    update: {},
    create: {
      name: "Lumi Art Studio",
      bio: "I create soft, dreamy character illustrations for portraits, original characters, and commissions.",
      tagline: "Soft dreamy character illustrations",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      twitter: "https://twitter.com/lumiart",
      instagram: "https://instagram.com/lumiart",
      facebook: "https://facebook.com/lumiart",
      email: "janmeru@example.com",
      password: hashedPassword,
    },
  });

  console.log("Profile seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
