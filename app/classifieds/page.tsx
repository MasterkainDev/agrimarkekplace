"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoryGrid } from "@/components/classifieds/category-grid";
import { ListingCard } from "@/components/classifieds/listing-card";
import { ListingFilters } from "@/components/classifieds/listing-filters";

// Mock data for featured listings
const featuredListings = [
  {
    id: "1",
    title: "Modern Farm Equipment",
    description: "High-quality farming equipment for sale...",
    price: 50000,
    category: "Equipment",
    subcategory: "Machinery",
    location: "Nairobi, Kenya",
    images: ["https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"],
    contactEmail: "seller@example.com",
    createdAt: "2024-03-15",
    userId: "user1",
    status: "active" as const,
    featured: true,
    views: 150,
  },
  // Add more mock listings as needed
];

export default function ClassifiedsPage() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Classifieds</h1>
            <p className="text-muted-foreground">
              Browse and post agricultural listings
            </p>
          </div>
          <Button asChild>
            <Link href="/classifieds/new">
              <Plus className="mr-2 h-4 w-4" /> Post Listing
            </Link>
          </Button>
        </div>

        <CategoryGrid />

        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <ListingFilters />
          </div>
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}