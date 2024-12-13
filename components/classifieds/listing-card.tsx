"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye, ArrowRight } from "lucide-react";
import type { Listing } from "@/lib/classifieds";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-video">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {listing.featured && (
          <Badge
            className="absolute top-2 right-2"
            variant="default"
          >
            Featured
          </Badge>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">{listing.category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Eye className="mr-1 h-4 w-4" />
            {listing.views} views
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{listing.title}</h3>
        <p className="text-2xl font-bold text-primary mb-4">
          ${listing.price.toLocaleString()}
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {listing.location}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(listing.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Button asChild className="w-full">
          <Link href={`/classifieds/listings/${listing.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}