import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { LenisProvider } from "@/components/LenisProvider";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PaperField } from "@/components/PaperField";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ViewTransitionsBridge } from "@/components/ViewTransitionsBridge";
import { siteDescription, siteTitleDefault } from "@/lib/brand";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/**
 * Instrument Serif is load-bearing for the aesthetic — we prefer a brief flash
 * of Georgia fallback over a mid-read font swap. `optional` tells the browser
 * to use the fallback if the serif isn't cached in ~100ms, then use the real
 * serif on the next navigation.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://colado.in"),
  title: {
    default: siteTitleDefault,
    template: "%s · Colado",
  },
  description: siteDescription,
  keywords: [
    "AI assistant",
    "task prioritization",
    "founders",
    "students",
    "focus",
    "composure",
    "productivity",
  ],
  openGraph: {
    title: siteTitleDefault,
    description: siteDescription,
    url: "https://colado.in",
    siteName: "Colado",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitleDefault,
    description: siteDescription,
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
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--ink)] antialiased">
        <LoadingScreen />
        <LenisProvider />
        <PaperField />
        <ScrollProgress />
        <ViewTransitionsBridge />
        {children}
        <KeyboardShortcuts />
      </body>
    </html>
  );
}
