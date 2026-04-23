import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://colado.in"),
  title: {
    default: "Colado — Stop planning. Start doing.",
    template: "%s · Colado",
  },
  description:
    "Colado is the quiet AI assistant for founders and students. Dump everything on your mind; get one clear next move.",
  keywords: [
    "AI assistant",
    "task prioritization",
    "founders",
    "students",
    "focus",
    "productivity",
  ],
  openGraph: {
    title: "Colado — Stop planning. Start doing.",
    description:
      "Dump everything on your mind. Colado decides what matters right now.",
    url: "https://colado.in",
    siteName: "Colado",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colado — Stop planning. Start doing.",
    description:
      "Dump everything on your mind. Colado decides what matters right now.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  /* Matches PDF / design system paper field (light-only site) */
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--ink)] antialiased">
        <ScrollProgress />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
