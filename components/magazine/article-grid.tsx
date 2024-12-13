import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { AuthorAvatar } from "./author-avatar";

const articles = [
  {
    id: 1,
    title: "Smart Irrigation Systems",
    excerpt: "How AI-powered irrigation is revolutionizing water management",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    trending: true,
    premium: true,
  },
  {
    id: 2,
    title: "Sustainable Farming in Nigeria",
    excerpt: "Traditional methods meet modern sustainability practices",
    category: "Sustainability",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b",
    author: {
      name: "Amina Diallo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    trending: false,
    premium: false,
  },
  {
    id: 3,
    title: "Coffee Market Analysis",
    excerpt: "Understanding price trends and market opportunities",
    category: "Market",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    trending: true,
    premium: true,
  },
  {
    id: 4,
    title: "Urban Farming Revolution",
    excerpt: "How cities are embracing agricultural innovation",
    category: "Innovation",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
    author: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    trending: false,
    premium: false,
  },
  {
    id: 5,
    title: "Digital Agriculture Trends",
    excerpt: "The future of farming in the digital age",
    category: "Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: {
      name: "David Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    trending: true,
    premium: true,
  },
  {
    id: 6,
    title: "Agricultural Finance",
    excerpt: "Investment opportunities in African agriculture",
    category: "Finance",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    trending: false,
    premium: false,
  }
];

export function ArticleGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              {article.trending && (
                <Badge variant="default" className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Trending</span>
                </Badge>
              )}
              {article.premium && (
                <Badge variant="secondary" className="bg-primary/10">
                  Premium
                </Badge>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {article.readTime}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <AuthorAvatar
                src={article.author.avatar}
                name={article.author.name}
                size="sm"
              />
              <Button asChild variant="ghost" className="p-0">
                <Link href={`/magazine/articles/${article.id}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}