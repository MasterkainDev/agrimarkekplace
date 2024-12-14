"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, SortDesc } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  location: string;
};

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Tomates Bio",
    price: 2.5,
    unit: "kg",
    category: "Légumes",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    location: "Dakar, Sénégal"
  },
  {
    id: 2,
    name: "Mangues",
    price: 3.0,
    unit: "kg",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
    location: "Abidjan, Côte d'Ivoire"
  },
  {
    id: 3,
    name: "Maïs",
    price: 1.8,
    unit: "kg",
    category: "Céréales",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop",
    location: "Bamako, Mali"
  },
];

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Marché Agricole</h1>
          <p className="text-muted-foreground">
            Découvrez des produits frais directement des agriculteurs locaux
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Rechercher des produits..."
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
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <SortDesc className="mr-2 h-4 w-4" />
              Trier
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.location}</p>
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {product.price.toFixed(2)} €/{product.unit}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Contacter le vendeur</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}