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
  metadataBase: new URL("https://kokki-six.vercel.app"),
  title: "Kokki — podblatowe kuchenki indukcyjne",
  description:
    "Odkryj nowy wymiar gotowania. Podblatowe kuchenki indukcyjne Kokki — ukryta innowacja w Twojej kuchni. Montaż pod spiekiem, granitem i kwarcytem.",
  openGraph: {
    title: "Kokki — podblatowe kuchenki indukcyjne",
    description:
      "Indukcja, która znika pod blatem. Minimalizm i elegancja połączone z niezrównaną funkcjonalnością.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/brand/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kokki — podblatowe kuchenki indukcyjne",
    description:
      "Indukcja, która znika pod blatem. Minimalizm i elegancja połączone z niezrównaną funkcjonalnością.",
    images: ["/brand/og.jpg"],
  },
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
