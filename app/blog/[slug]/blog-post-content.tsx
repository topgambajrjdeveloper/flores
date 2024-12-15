"use client";

import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Blog } from "@/types/sanity";
import { Badge } from "@/components/ui/badge";
import { urlForImage } from "@/lib/sanity.image";
import { PortableText } from "@portabletext/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SharedCardLink from "@/components/shared-card-link";

export default function BlogPostContent({ post }: { post: Blog }) {
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const postImage = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : undefined;

  return (
    <article className="container mx-auto px-4 py-16">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </CardTitle>
          <CardDescription>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Por {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", {
                  locale: es,
                })}
              </time>
            </div>
          </CardDescription>
        </CardHeader>
        {post.mainImage && (
          <Image
            src={urlForImage(post.mainImage).url()}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
          />
        )}
        <CardContent className="prose dark:prose-invert max-w-none py-6">
          <PortableText value={post.body} />
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags &&
              post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <SharedCardLink
                url={postUrl}
                title={post.title}
                description={post.excerpt}
                image={postImage}
                hashtag="#LaHigueraVerde"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}
