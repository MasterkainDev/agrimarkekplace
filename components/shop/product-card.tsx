"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-2xl font-bold text-primary mb-4">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href={`/shop/products/${product.id}`}>View Details</Link>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}