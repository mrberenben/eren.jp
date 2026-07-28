// next
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// analytics
import { Analytics } from "@vercel/analytics/next";

// lenis
import { ReactLenis } from "lenis/react";

// components
import { Providers } from "~/components/providers";
import { Header, Footer } from "~/components/layout";

// styles
import "~/styles/globals.css";
import "lenis/dist/lenis.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Eren Kuliş | Software Developer",
    template: "%s | Eren Kuliş, Software Developer"
  },
  description:
    "Portfolio website of 25-year-old frontend developer based in Istanbul, Turkey. Showcasing work experience, projects, and blog posts about web development."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>

      <ReactLenis root />
      <Analytics />
    </html>
  );
}
