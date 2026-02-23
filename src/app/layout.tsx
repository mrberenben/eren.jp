import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Header, Footer } from "~/components/layout";
import { Providers } from "~/components/providers";
import { Analytics } from "@vercel/analytics/next";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "eren.jp | frontend developer",
    template: "%s | eren.jp"
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
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <Providers>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>

      <Analytics />
    </html>
  );
}
