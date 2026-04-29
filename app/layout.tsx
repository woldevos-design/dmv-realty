import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Alex Johnson | DMV Real Estate Agent",
    template: "%s | Alex Johnson Real Estate",
  },
  description:
    "Expert real estate services in Washington DC, Maryland, and Virginia. Find your dream home in the DMV area with Alex Johnson.",
  keywords: ["real estate", "DMV", "Washington DC", "Maryland", "Virginia", "homes for sale"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
