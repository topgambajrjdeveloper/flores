
import BlogFilter from './blog-filter'
import { client } from '@/lib/sanity.client'
import BlogList from '@/components/pages/Blog/blog-list'
import FeaturedPosts from '@/components/pages/Blog/featured-posts'
import { SITE_INFO } from '@/seo'

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
  const featuredPosts = posts.slice(0, 3)
  const remainingPosts = posts.slice(3)

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold pt-6 mb-6 md:mb-6">El Blog de {SITE_INFO.siteName}</h1>
      <div className="space-y-2">
        <BlogFilter categories={categories} posts={remainingPosts} />
        <FeaturedPosts posts={featuredPosts} />
        <BlogList posts={remainingPosts} />
      </div>
    </div>
  )
}

