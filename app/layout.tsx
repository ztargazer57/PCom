import type { Metadata } from "next";
import { Ysabeau, Wix_Madefor_Display, Dongle } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ysabeau = Ysabeau({
    variable: "--font-ysabeau",
    subsets: ["latin"],
})

const wixMadeforDisplay = Wix_Madefor_Display({
    variable: "--font-wix-madefor-display",
    subsets: ["latin"],
})

const dongle = Dongle({
    variable: "--font-dongle",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "PCom",
  description: "A commission management app for artists built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-accent="emerald"
      className={cn("h-full", "antialiased", wixMadeforDisplay.variable, ysabeau.variable, dongle.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
