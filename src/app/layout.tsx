import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gemessence | The AI Marketing Engine",
  description: "Enterprise gemstone e-commerce with advanced AI matchmaker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
