"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Share2, Bookmark, ThumbsUp } from "lucide-react";

// Simuler les données de l'article
const article = {
  id: 1,
  title: "L'Agriculture Durable en Afrique : Tendances et Innovations",
  excerpt: "Découvrez les dernières innovations en matière d'agriculture durable et comment elles transforment le paysage agricole africain.",
  content: `
    <p>L'agriculture africaine est en pleine transformation. Les agriculteurs adoptent de plus en plus de pratiques durables et innovantes pour faire face aux défis du changement climatique et de la sécurité alimentaire.</p>

    <h2>Les Innovations Clés</h2>
    <p>Parmi les innovations les plus prometteuses, on trouve :</p>
    <ul>
      <li>L'agriculture de précision assistée par drone</li>
      <li>Les systèmes d'irrigation intelligents</li>
      <li>Les techniques de culture hydroponique</li>
      <li>L'utilisation de l'intelligence artificielle pour la prévision des récoltes</li>
    </ul>

    <h2>Impact sur les Communautés</h2>
    <p>Ces innovations ont un impact significatif sur les communautés rurales :</p>
    <ul>
      <li>Augmentation des rendements agricoles</li>
      <li>Réduction de la consommation d'eau</li>
      <li>Amélioration des revenus des agriculteurs</li>
      <li>Création d'emplois dans le secteur technologique agricole</li>
    </ul>

    <h2>Perspectives d'Avenir</h2>
    <p>L'avenir de l'agriculture africaine s'annonce prometteur, avec de nombreuses opportunités de développement et d'innovation. Les investissements dans ce secteur continuent de croître, attirant l'attention des acteurs locaux et internationaux.</p>
  `,
  category: "Innovation",
  mainImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  author: {
    name: "Dr. Aminata Diallo",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Experte en agriculture durable et innovation agricole",
  },
  date: "14 Dec 2023",
  readTime: "5 min",
  tags: ["Agriculture Durable", "Innovation", "Technologie", "Afrique"],
  relatedArticles: [
    {
      id: 2,
      title: "Guide Complet sur la Culture du Cacao Bio",
      image: "https://images.unsplash.com/photo-1528903384637-blcd564ebaf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Guide",
    },
    {
      id: 3,
      title: "L'Impact du Changement Climatique sur l'Agriculture",
      image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Environnement",
    },
  ],
};

export default function ClientArticlePage({ params }: { params: { id: string } }) {
  return (
    <article className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="space-y-4 text-center mb-8">
          <Badge>{article.category}</Badge>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.excerpt}</p>
          
          {/* Article Meta */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author.name}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.mainImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            J'aime
          </Button>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-gray dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author Bio */}
        <Card className="p-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={article.author.image}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{article.author.name}</h3>
              <p className="text-sm text-muted-foreground">{article.author.bio}</p>
            </div>
          </div>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Related Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Articles Similaires</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {article.relatedArticles.map((related) => (
              <Link href={`/articles/${related.id}`} key={related.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 left-2">
                      {related.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold hover:text-primary">
                      {related.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
