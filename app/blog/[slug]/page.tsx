import { Blog } from '@/types/sanity'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import BlogPostContent from './blog-post-content'
import { Metadata } from 'next'

async function getBlogPost(slug: string): Promise<Blog | null> {
  try {
    const post = await client.fetch(
      `*[_type == "blog" && slug.current == $slug][0]{
        _type,
        title,
        "slug": slug.current,
        "author": author->name,
        mainImage,
        publishedAt,
        categories[]->{
          title,
          "slug": slug.current
        },
        body,
        excerpt,
        tags,
        socialShare
      }`,
      { slug }
    )
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post not found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}