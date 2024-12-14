import { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: SanityImageSource[];
  categoryName?: string;
  inStock: boolean;
  sizes?: { name: string }[];
  flowerTypes?: string[];
  occasion?: string[];
  colors?: string[];
  style?: string;
  careInstructions?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl: SanityImageSource
}

export interface RecentlyViewedProduct {
  _id: string;
  name: string;
  slug: string;
  imageUrl: SanityImageSource;
  price: number;
}

export interface Blog {
  _type: 'blog'
  _id: string
  title: string
  slug: string
  author: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any // You might want to define a more specific type for images
  publishedAt: string
  categories: Array<{
    _id:string
    title: string
    slug: string
  }>
  body: PortableTextBlock[]
  excerpt?: string
  tags?: string[]
  socialShare?: {
    facebook?: boolean
    twitter?: boolean
    linkedin?: boolean
    instagram?:boolean
  }
}


export interface AboutMe {
  name: string
  profileImage?: SanityImageSource
  bio: PortableTextBlock[]
  specialties?: string[]
  experience?: number
  education?: Education[]
  awards?: Award[]
  socialMedia?: SocialMedia
  contactInfo?: ContactInfo
}

interface Education {
  degree: string
  institution: string
  year: number
}

interface Award {
  title: string
  year: number
  description: string
}

interface SocialMedia {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  pinterest?: string
}

interface ContactInfo {
  email?: string
  phone?: string
}