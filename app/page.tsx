"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import HeroSection from "@/components/pages/Home/HeroSection";
import CategoriesSection from "@/components/pages/Home/CategoriesSection";
import { FeaturedProducts } from "@/components/pages/Home/FeaturedProducts";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState({
    featuredProduct: null,
    categories: [],
    featuredProducts: [],
  });

  useEffect(() => {
    // Cargar datos del servidor
    async function fetchHomePageData() {
      const result = await client.fetch(`{
        "featuredProduct": *[_type == "product" && featured == true][0] {
          _id,
          name,
          "slug": slug.current,
          description,
          "imageUrl": images[0].asset->url,
          price
        },
        "categories": *[_type == "category"] {
          _id,
          name,
          "slug": slug.current,
          "imageUrl": image.asset->url
        },
        "featuredProducts": *[_type == "product" && featured == true][0...4] {
          _id,
          name,
          "slug": slug.current,
          "imageUrl": images[0].asset->url,
          price
        }
      }`);
      setData(result);
    }

    fetchHomePageData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategories = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {data.featuredProduct && (
        <HeroSection
          product={data.featuredProduct}
          scrolled={scrolled}
          scrollToCategories={scrollToCategories}
        />
      )}
      <CategoriesSection categories={data.categories} />
      <FeaturedProducts products={data.featuredProducts} />
    </div>
  );
}
