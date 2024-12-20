'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import BlogList from '@/components/pages/Blog/blog-list'
import { Blog, Category } from '@/types/sanity'

interface BlogFilterProps {
  categories: Category[]
  posts: Blog[]
}

export default function BlogFilter({ categories, posts }:BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categories.some(cat => cat._id === selectedCategory))
    : posts

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          Todas
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.title}
          </Button>
        ))}
      </div>
      <BlogList posts={filteredPosts} />
    </div>
  )
}