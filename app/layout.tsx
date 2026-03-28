import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { LenisRoot } from "@/components/LenisRoot";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-colado",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Colado — Clarity on what to do next",
  description:
    "Colado cuts through the noise and shows you the single best action to take—so you spend less time planning and more time doing.",
  icons: {
    icon: [{ url: "/screen.png", type: "image/png" }],
    apple: [{ url: "/screen.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <LenisRoot>{children}</LenisRoot>
      </body>
    </html>
  );
}
