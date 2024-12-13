"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/shop/category-grid";
import { ProductGrid } from "@/components/shop/product-grid";
import { Search, Filter, Grid, List } from "lucide-react";

// Mock data - replace with actual API call
const products = [
  {
    id: "1",
    name: "Organic Fertilizer",
    description: "Premium organic fertilizer for all crops",
    price: 29.99,
    category: "Fertilizers",
    images: ["https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d"],
    stock: 100,
    rating: 4.5,
    reviews: 128,
    seller: {
      id: "seller1",
      name: "Green Earth Co.",
      rating: 4.8,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Premium Seeds Pack",
    description: "High-quality seeds for various crops",
    price: 15.99,
    category: "Seeds",
    images: ["https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"],
    stock: 50,
    rating: 4.8,
    reviews: 89,
    seller: {
      id: "seller2",
      name: "Seed Masters Ltd.",
      rating: 4.9,
    },
    createdAt: new Date().toISOString(),
  },
  // Add more mock products as needed
];

export default function ShopPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="container py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agricultural Shop</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Categories</h2>
          <CategoryGrid />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <ProductGrid products={products} />
        </section>
      </motion.div>
    </div>
  );
}