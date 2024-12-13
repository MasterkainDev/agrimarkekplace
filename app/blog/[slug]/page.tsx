"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RelatedPosts } from "@/components/blog/related-posts";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;

  // Dans un cas réel, nous ferions un appel API pour récupérer les données du post
  const post = {
    title: "L'Impact de l'Agriculture Numérique en Afrique",
    excerpt: "Comment la technologie transforme le secteur agricole africain",
    content: `
      L'agriculture numérique révolutionne le secteur agricole en Afrique. 
      Les agriculteurs adoptent de plus en plus les technologies modernes pour 
      améliorer leur productivité et leur accès au marché...
    `,
    coverImage: "/images/blog/digital-farming.jpg",
    category: "Agriculture Numérique",
    author: {
      name: "Jean Dupont",
      image: "/images/avatars/jean.jpg",
      bio: "Expert en agriculture numérique avec plus de 10 ans d'expérience",
    },
    publishedAt: "10 Dec 2023",
    readingTime: "5 min",
  };

  return (
    <article className="container max-w-4xl mx-auto py-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="mb-2">
          {post.category}
        </Badge>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="mr-1 h-4 w-4" />
              {post.publishedAt}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readingTime}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full my-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>

      <div className="flex justify-center py-8">
        <Button variant="outline" className="flex items-center">
          <Share2 className="mr-2 h-4 w-4" />
          Partager cet article
        </Button>
      </div>

      <Separator className="my-8" />

      <RelatedPosts currentSlug={slug as string} />
    </article>
  );
}
