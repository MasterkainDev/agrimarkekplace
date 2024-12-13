"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "@/components/ui/image-carousel";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Share2,
  Flag,
  Heart,
  MessageCircle,
} from "lucide-react";

// Mock data - Dans un cas réel, ces données viendraient d'une API
const mockClassified = {
  id: "1",
  title: "Tracteur Agricole Massey Ferguson",
  category: "equipment",
  price: 15000000,
  location: "Yamoussoukro",
  description: `
    Tracteur Massey Ferguson 5610 en excellent état
    - Année : 2019
    - Heures de fonctionnement : 1200h
    - Puissance : 105 CV
    - Transmission : Dyna-4
    - Climatisation
    - 4 roues motrices
    
    Entretien régulier effectué, tous les documents disponibles.
    Parfait pour les travaux agricoles de moyenne et grande envergure.
  `,
  images: [
    "/images/classifieds/tractor1.jpg",
    "/images/classifieds/tractor2.jpg",
    "/images/classifieds/tractor3.jpg",
  ],
  contact: {
    name: "Ibrahim Koné",
    phone: "225 0708090910",
    email: "ibrahim.kone@email.com",
  },
  publishedAt: "2024-01-05",
  views: 245,
};

export default function ClassifiedDetailPage() {
  const params = useParams();
  const classifiedId = params.id;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Images et Détails Principaux */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{mockClassified.title}</h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{mockClassified.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockClassified.location}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {mockClassified.price.toLocaleString()} FCFA
                </div>
              </div>

              <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                <ImageCarousel images={mockClassified.images} />
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <pre className="whitespace-pre-wrap text-muted-foreground font-sans">
                  {mockClassified.description}
                </pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{mockClassified.contact.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{mockClassified.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{mockClassified.contact.email}</span>
              </div>
              <Separator />
              <div className="space-y-3">
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Envoyer un message
                </Button>
              </div>
            </div>
          </Card>

          {/* Actions Card */}
          <Card className="p-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
              <Button variant="outline" className="w-full text-destructive">
                <Flag className="mr-2 h-4 w-4" />
                Signaler
              </Button>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Publiée le : {new Date(mockClassified.publishedAt).toLocaleDateString()}</p>
              <p>Référence : #{classifiedId}</p>
              <p>Vues : {mockClassified.views}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
