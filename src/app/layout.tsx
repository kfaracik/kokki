import type { Metadata } from "next";
import { Outfit, Lato } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/Chrome";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Kokki — podblatowe kuchenki indukcyjne",
  description:
    "Odkryj nowy wymiar gotowania. Podblatowe kuchenki indukcyjne Kokki — ukryta innowacja w Twojej kuchni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${outfit.variable} ${lato.variable}`}>
        <Chrome />
        {children}
      </body>
    </html>
  );
}
