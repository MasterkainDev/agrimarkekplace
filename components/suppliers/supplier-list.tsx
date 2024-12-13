"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MoreVertical, Phone, Mail, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupplierDetailsDialog } from "./supplier-details-dialog";

interface SupplierListProps {
  searchQuery: string;
  sortBy: string;
}

// Mock data pour les fournisseurs
const suppliers = [
  {
    id: 1,
    name: "Coopérative Agricole du Sud",
    logo: "/logos/cooperative-sud.jpg",
    category: "Céréales",
    rating: 4.8,
    totalOrders: 156,
    totalAmount: 15600000,
    status: "active",
    location: "Abidjan, Côte d'Ivoire",
    phone: "+225 07 12 34 56 78",
    email: "contact@cooperative-sud.ci",
    products: ["Maïs", "Riz", "Mil"],
  },
  {
    id: 2,
    name: "Bio Légumes SARL",
    logo: "/logos/bio-legumes.jpg",
    category: "Légumes",
    rating: 4.5,
    totalOrders: 98,
    totalAmount: 8900000,
    status: "active",
    location: "Yamoussoukro, Côte d'Ivoire",
    phone: "+225 05 98 76 54 32",
    email: "contact@biolegumes.ci",
    products: ["Tomates", "Oignons", "Carottes"],
  },
  {
    id: 3,
    name: "Fruits Tropicaux Express",
    logo: "/logos/fruits-express.jpg",
    category: "Fruits",
    rating: 4.2,
    totalOrders: 75,
    totalAmount: 6500000,
    status: "inactive",
    location: "Bouaké, Côte d'Ivoire",
    phone: "+225 01 23 45 67 89",
    email: "contact@fruitsexpress.ci",
    products: ["Mangues", "Ananas", "Bananes"],
  },
];

export function SupplierList({ searchQuery, sortBy }: SupplierListProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Filtrer et trier les fournisseurs
  const filteredSuppliers = suppliers
    .filter((supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "amount":
          return b.totalAmount - a.totalAmount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <>
      <div className="space-y-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="p-6">
            <div className="flex items-start justify-between">
              {/* Info principale */}
              <div className="flex space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={supplier.logo} />
                  <AvatarFallback>
                    {supplier.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{supplier.name}</h3>
                    <Badge
                      variant={
                        supplier.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {supplier.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{supplier.category}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {supplier.rating}
                    </div>
                    <span>{supplier.totalOrders} commandes</span>
                    <span>{formatCurrency(supplier.totalAmount)}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {supplier.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    Voir les détails
                  </DropdownMenuItem>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem>Nouvelle commande</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Désactiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Produits */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Produits</h4>
              <div className="flex flex-wrap gap-2">
                {supplier.products.map((product) => (
                  <Badge key={product} variant="secondary">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-4 flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                {supplier.phone}
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                {supplier.email}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog des détails */}
      {selectedSupplier && (
        <SupplierDetailsDialog
          supplier={selectedSupplier}
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </>
  );
}
