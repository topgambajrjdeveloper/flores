
import BlogFilter from './blog-filter'
import { client } from '@/lib/sanity.client'
import BlogList from '@/components/pages/Blog/blog-list'

async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "slug": slug.current
    }
  `)
}

async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "author": author->name,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `)
}

export default async function BlogPage() {
  const [categories, posts] = await Promise.all([getCategories(), getBlogPosts()])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogFilter categories={categories} posts={posts} />
      <BlogList posts={posts} />
    </div>
  )
}

