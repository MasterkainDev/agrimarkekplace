"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Ruler,
  User,
  Phone,
  Mail,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FarmPage({ params }: { params: { slug: string } }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const farm = {
    title: "Fertile Valley Farm",
    location: "Nairobi Region, Kenya",
    price: "$200,000",
    size: "50 hectares",
    description: "Pristine farmland with rich soil perfect for crop cultivation. Features include an established irrigation system, storage facilities, and excellent road access.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef"],
    features: [
      "Irrigation System",
      "Storage Facilities",
      "Road Access",
      "Electricity",
      "Water Supply",
      "Fenced",
    ],
    owner: {
      name: "John Doe",
      phone: "+254 123 456 789",
      email: "john@example.com",
      verified: true,
    },
    listed: "2024-01-15",
  };

  const handleContact = () => {
    toast({
      title: "Message Sent",
      description: "The owner will respond to your inquiry soon.",
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Farm removed from your wishlist" : "Farm added to your wishlist",
    });
  };

  return (
    <div className="container py-8">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{farm.title}</h1>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{farm.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleWishlist}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Share Link Copied",
                  description: "Farm listing link copied to clipboard",
                });
              }}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={farm.images[0]}
              alt={farm.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{farm.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Listed</p>
                    <p className="font-medium">{new Date(farm.listed).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{farm.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {farm.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Contact Owner</h3>
                <p className="text-2xl font-bold text-primary">{farm.price}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{farm.owner.name}</p>
                    {farm.owner.verified && (
                      <Badge variant="secondary">Verified Owner</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{farm.owner.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{farm.owner.email}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full" onClick={handleContact}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Visit
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}