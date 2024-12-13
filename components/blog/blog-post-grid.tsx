"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "African AgriTech Startups Raise $200M in Q1 2024",
    excerpt: "Investment in African agricultural technology reaches new heights...",
    category: "Investment",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    date: "2024-03-15",
    author: "Sarah Johnson",
    trending: true,
  },
  {
    id: 2,
    title: "Kenya's Coffee Export Market Expansion",
    excerpt: "How Kenya is positioning itself as a premium coffee exporter...",
    category: "Market Analysis",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    date: "2024-03-14",
    author: "Michael Okonjo",
  },
  {
    id: 3,
    title: "Sustainable Farming Practices in Nigeria",
    excerpt: "New initiatives driving sustainable agriculture in West Africa...",
    category: "Sustainability",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9",
    date: "2024-03-13",
    author: "Amina Diallo",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function BlogPostGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <Card className="overflow-hidden group h-full">
            <div className="relative aspect-video">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {post.trending && (
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Trending</span>
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {post.author}
                  </span>
                </div>
                <Button asChild variant="ghost" className="p-0">
                  <Link href={`/blog/posts/${post.id}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}