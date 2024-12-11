'use client'

import { useEffect } from 'react'
import { Product, RecentlyViewedProduct } from '@/types/sanity'

export default function AddToRecentlyViewed({ product }: { product: Product }) {
  useEffect(() => {
    const addToRecentlyViewed = () => {
      const recentlyViewed: RecentlyViewedProduct[] = JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]')
      const existingIndex = recentlyViewed.findIndex((item) => item._id === product._id)
      
      if (existingIndex !== -1) {
        recentlyViewed.splice(existingIndex, 1)
      }
      
      recentlyViewed.unshift({
        _id: product._id,
        name: product.name,
        slug: product.slug,
        imageUrl: product.images[0],
        price: product.price
      })
      
      localStorage.setItem('recentlyViewedProducts', JSON.stringify(recentlyViewed.slice(0, 10)))
    }

    addToRecentlyViewed()
  }, [product])

  return null
}