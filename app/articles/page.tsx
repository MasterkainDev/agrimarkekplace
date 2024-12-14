"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
};

const sampleArticles: Article[] = [
  {
    id: 1,
    title: "L'Agriculture Durable en Afrique : Tendances et Innovations",
    excerpt: "Découvrez les dernières innovations en matière d'agriculture durable et comment elles transforment le paysage agricole africain.",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
    author: "Dr. Aminata Diallo",
    date: "14 Dec 2023",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Guide Complet sur la Culture du Cacao Bio",
    excerpt: "Un guide détaillé sur les meilleures pratiques pour la culture du cacao biologique en Afrique de l'Ouest.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1528903384637-blcd564ebaf9",
    author: "Jean-Paul Kouassi",
    date: "13 Dec 2023",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "L'Impact du Changement Climatique sur l'Agriculture",
    excerpt: "Analyse des effets du changement climatique sur l'agriculture africaine et les solutions d'adaptation.",
    category: "Environnement",
    image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a",
    author: "Sarah Mensah",
    date: "12 Dec 2023",
    readTime: "6 min"
  },
];

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Articles & Actualités</h1>
          <p className="text-muted-foreground">
            Restez informé des dernières actualités et tendances de l'agriculture africaine
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Tous les articles
            </Button>
            <Button variant="outline" size="sm">
              Innovation
            </Button>
            <Button variant="outline" size="sm">
              Guide
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleArticles.map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="line-clamp-2 mb-2 hover:text-primary">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
