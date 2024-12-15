import "./globals.css";
import { SITE_INFO } from "@/seo";
import type { Metadata } from "next";
import Header from "@/components/header";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/cart-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import Loading from "@/components/loading";

const outfitSans = Outfit({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: SITE_INFO.defaultTitle,
  description: SITE_INFO.defaultDescription,
  keywords: SITE_INFO.keyWordsSite,
  authors: SITE_INFO.authors,
  // viewport: SITE_INFO.viewport,
  robots: SITE_INFO.robots,
  openGraph: {
    title: SITE_INFO.defaultDescription,
    description: SITE_INFO.defaultDescription,
    url: SITE_INFO.openGraph.url,
    images: [
      {
        url: "https://www.tuwebdeflores.com/imagen-destacada.jpg",
        width: 800,
        height: 600,
        alt: SITE_INFO.siteName,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${outfitSans.className} flex flex-col min-h-screen antialiased`}
      >
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90">
              <main className="flex-grow ">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
