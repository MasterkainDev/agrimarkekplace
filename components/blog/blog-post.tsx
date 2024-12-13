"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPostProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  readingTime: string;
}

export function BlogPost({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  author,
  publishedAt,
  readingTime,
}: BlogPostProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{author.name}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                {publishedAt}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {readingTime}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
