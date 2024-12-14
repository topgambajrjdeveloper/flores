"use client";

import Link from "next/link";
import { SITE_INFO } from "@/seo";
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import BottomNav from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ModeToggle } from "@/components/mode-toggle";
import { ErrorBoundary } from "@/components/error-boundary";
import CartDrawer from "@/components/pages/Shop/cart-drawer";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Saltar al contenido principal
      </a>
      <header
        className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 transition-all duration-300 ease-in-out ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              {SITE_INFO.siteName}
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/about-me">Sobre Mí</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">Contacto</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/studio" target="_blank">
                  Administrar
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/shop">Tienda</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <ErrorBoundary fallback={<p>Error al cargar el carrito</p>}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(true)}
                  className="relative"
                  aria-label="Abrir carrito de compras"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Carrito de compras</span>
                </Button>
              </ErrorBoundary>
            </div>
          </div>
        </nav>
      </header>
      <BottomNav />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}