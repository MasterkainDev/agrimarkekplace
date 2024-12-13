"use client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "seeds",
    name: "Seeds & Plants",
    description: "High-quality seeds and seedlings for various crops",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    description: "Organic and chemical fertilizers for optimal growth",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d",
  },
  {
    id: "tools",
    name: "Tools & Equipment",
    description: "Essential farming tools and equipment",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
  },
  {
    id: "irrigation",
    name: "Irrigation Systems",
    description: "Modern irrigation solutions for efficient farming",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0",
  },
];