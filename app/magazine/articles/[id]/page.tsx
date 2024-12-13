"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Share2, BookmarkPlus, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const { toast } = useToast();

  const article = {
    title: "Revolutionizing African Agriculture Through Technology",
    category: "Technology",
    readTime: "10 min read",
    publishDate: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Agricultural Technology Researcher at African Institute of Innovation",
    },
    content: `
      <p class="mb-4">The agricultural landscape in Africa is undergoing a remarkable transformation, driven by technological innovations and smart farming practices. This shift is not just about adopting new tools; it's about reimagining the entire agricultural ecosystem.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Rise of Smart Farming</h2>
      <p class="mb-4">Smart farming technologies are revolutionizing how African farmers approach agriculture. From AI-powered irrigation systems to drone-based crop monitoring, these innovations are helping farmers make more informed decisions and optimize their yields.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Data-Driven Agriculture</h2>
      <p class="mb-4">The integration of data analytics in farming has opened new possibilities for precision agriculture. Farmers can now access real-time information about soil conditions, weather patterns, and crop health, enabling them to make data-driven decisions that improve productivity and sustainability.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Sustainable Practices</h2>
      <p class="mb-4">Technology is also playing a crucial role in promoting sustainable farming practices. Through innovative solutions for water management and soil conservation, farmers are finding ways to maintain productivity while protecting natural resources.</p>
    `,
    relatedArticles: [
      {
        title: "AI in Agriculture: A Game Changer",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      },
      {
        title: "The Future of Farming",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b",
      },
    ],
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Article removed from your reading list" : "Article saved to your reading list",
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      toast({
        title: "Article liked",
        description: "Thank you for your feedback!",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Link copied",
      description: "Article link copied to clipboard",
    });
  };

  return (
    <div className="container py-8">
      <article className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">{article.publishDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{article.readTime}</span>
            </div>
          </div>

          <div className="relative aspect-video mt-6">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={hasLiked ? "text-primary" : ""}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {likes}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? "text-primary" : ""}
            >
              <BookmarkPlus className="mr-2 h-4 w-4" />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
          </div>

          <Separator />

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Separator className="my-8" />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {article.relatedArticles.map((related, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{related.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}