

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity.image";


export default function HeroSection({
  scrolled,
  scrollToCategories,
  product
  }) {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            {product.name}
          </h1>
          <p className="text-xl mb-8 pr-6 text-muted-foreground text-justify line-clamp-4">
            {product.description}
          </p>
          <Button size="lg" asChild>
            <Link href="/shop">Ver en la Tienda</Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src={urlForImage(product.imageUrl).url()}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg shadow-lg dark:shadow-primary/20"
          />
        </div>
      </div>

      {/* Scroll Indicator for Mobile */}
      <motion.div
        className=" md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 items-center flex justify-center "
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className=" bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
          onClick={scrollToCategories}
          aria-label="Desplázate hacia abajo para ver más contenido"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Desktop "Discover Categories" Button */}
      <div
        className={`hidden md:block absolute bottom-8 left-0 right-0 transition-opacity duration-300 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="container mx-auto px-6 flex justify-center">
          <Button
            variant="outline"
            onClick={scrollToCategories}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
          >
            Descubre Nuestras Categorías <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
