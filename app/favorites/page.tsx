"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FavoriteItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  seller: string;
  location: string;
};

const sampleFavorites: FavoriteItem[] = [
  {
    id: 1,
    name: "Tomates Bio Premium",
    price: 2.5,
    unit: "kg",
    category: "Légumes",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    seller: "Ferme Bio du Soleil",
    location: "Dakar, Sénégal"
  },
  {
    id: 2,
    name: "Mangues Kent",
    price: 3.0,
    unit: "kg",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    seller: "Vergers d'Abidjan",
    location: "Abidjan, Côte d'Ivoire"
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(sampleFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Mes Favoris</h1>
          <p className="text-muted-foreground">
            Gérez vos produits favoris et restez informé de leur disponibilité
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore ajouté de produits à vos favoris
            </p>
            <Link href="/market">
              <Button>
                Découvrir les produits
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <Card key={item.id} className="relative group">
                <CardHeader className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge>{item.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-semibold text-primary">
                      {item.price} € / {item.unit}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{item.seller}</p>
                    <p>{item.location}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Link href={`/products/${item.id}`}>
                    <Button variant="secondary">
                      Voir le produit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeFavorite(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
