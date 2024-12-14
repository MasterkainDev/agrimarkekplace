"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, SortDesc } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  seller: {
    name: string;
    location: string;
  };
};

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Tomates Bio Premium",
    price: 2.5,
    unit: "kg",
    category: "Légumes",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    description: "Tomates biologiques cultivées localement, parfaites pour vos salades et sauces",
    stock: 100,
    rating: 4.5,
    seller: {
      name: "Ferme Bio du Soleil",
      location: "Dakar, Sénégal"
    }
  },
  {
    id: 2,
    name: "Mangues Kent",
    price: 3.0,
    unit: "kg",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
    description: "Mangues Kent juteuses et sucrées, idéales pour la consommation directe ou les jus",
    stock: 75,
    rating: 4.8,
    seller: {
      name: "Vergers d'Abidjan",
      location: "Abidjan, Côte d'Ivoire"
    }
  },
  {
    id: 3,
    name: "Maïs Blanc Premium",
    price: 1.8,
    unit: "kg",
    category: "Céréales",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop",
    description: "Maïs blanc de haute qualité, parfait pour la farine ou la consommation directe",
    stock: 500,
    rating: 4.3,
    seller: {
      name: "Coopérative du Mali",
      location: "Bamako, Mali"
    }
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Nos Produits</h1>
          <p className="text-muted-foreground">
            Découvrez notre sélection de produits agricoles de qualité
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="legumes">Légumes</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="cereales">Céréales</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Meilleures notes</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sampleProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="line-clamp-2 mb-2 hover:text-primary">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">
                      {product.price.toFixed(2)} €/{product.unit}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {product.seller.location}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
