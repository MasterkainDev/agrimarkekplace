"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductViewProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    specifications: Array<{ label: string; value: string }>;
  };
}

export function ProductView({ product }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="container py-8">
      <Card className="p-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold">${product.price}</span>
                <Badge variant="secondary" className="ml-2">
                  In Stock
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <Input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                <Button className="flex-1" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
