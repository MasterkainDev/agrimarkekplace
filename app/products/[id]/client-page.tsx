"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Star,
  Truck,
  Shield,
  MessageCircle,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";

interface ProductPageProps {
  product: {
    id: number;
    name: string;
    price: number;
    unit: string;
    category: string;
    images: string[];
    description: string;
    specifications: {
      origine: string;
      certification: string;
      conservation: string;
      calibre: string;
    };
    stock: number;
    rating: number;
    reviews: number;
    seller: {
      name: string;
      location: string;
      rating: number;
      sales: number;
      joinedDate: string;
    };
  };
}

export function ProductPageClient({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <Badge>{product.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} avis)
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{product.price}€</span>
              <span className="text-muted-foreground">/ {product.unit}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Stock disponible : {product.stock} {product.unit}s
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ajouter au panier
            </Button>
          </div>

          <Card className="grid grid-cols-3 gap-4 p-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-sm">Livraison rapide</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-sm">Qualité garantie</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="text-sm">Support 24/7</span>
            </div>
          </Card>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <dl className="grid gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="font-medium capitalize">{key}</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
          </Tabs>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-medium">{product.seller.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.seller.location}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>{product.seller.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.seller.sales} ventes
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
