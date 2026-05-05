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
// Seed Profile
  await prisma.profiles.upsert({
    where: {
        email: "janmeru@example.com",
    },

    update: {},

    create: {
      name: "Lumi Art Studio",

      bio: "I create soft, dreamy character illustrations for portraits, original characters, and commissions.",

      tagline: "Soft dreamy character illustrations",

      avatar_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",

      twitter: "https://twitter.com/lumiart",

      instagram: "https://instagram.com/lumiart",

      facebook: "https://facebook.com/lumiart",

      email: "janmeru@example.com",

      password: hashedPassword,

    },
  });

  // Seed Site Content
  await prisma.site_content.upsert({
    where: {
      id: "main",
    },

    update: {},

    create: {
      id: "main",

      hero_title: "Dreamy Character Illustrations",

      hero_subtitle:
        "Soft, expressive artwork made with care.",

      featured_title: "Featured Works",

      about_title: "About the Artist",

      about_text:
        "I create character illustrations focused on emotion and storytelling.",

      cta_title: "Commissions",

      cta_text:
        "Interested in your own custom artwork? Request a soft character portrait, original character artwork, or a meaningful illustrated gift made with care.",

      cta_button_text: "Request a Commission",
    },
  });

  // Seed Commission Settings
  await prisma.commission_settings.create({
    data: {
      is_open: true,

      availability: "3 slots open this month",

      pricing_text:
        "Starts at ₱1,500 depending on complexity.",

      terms_text:
        "50% down payment required. No refunds after sketch approval.",

      process_text:
        "Inquiry → Sketch → Approval → Final Render → Delivery",
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
