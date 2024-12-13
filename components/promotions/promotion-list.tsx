"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Calendar,
  Tag,
  Users,
  ShoppingCart,
  Eye,
  Edit,
  Copy,
  Ban,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PromotionDetailsDialog } from "./promotion-details-dialog";

interface PromotionListProps {
  status: string;
  searchQuery: string;
  sortBy: string;
}

// Mock data pour les promotions
const promotions = [
  {
    id: "PROMO-001",
    name: "Soldes de Saison",
    description: "Réductions exceptionnelles sur les produits de saison",
    type: "percentage",
    value: 20,
    startDate: "2024-12-01T00:00:00",
    endDate: "2024-12-31T23:59:59",
    products: ["Maïs", "Riz", "Tomates"],
    minPurchase: 50000,
    maxDiscount: 100000,
    usageLimit: 1000,
    usageCount: 450,
    totalSales: 4500000,
    status: "active",
  },
  {
    id: "PROMO-002",
    name: "Offre Flash",
    description: "24h de prix cassés sur une sélection de produits",
    type: "fixed",
    value: 5000,
    startDate: "2024-12-15T00:00:00",
    endDate: "2024-12-15T23:59:59",
    products: ["Mangues", "Ananas"],
    minPurchase: 20000,
    maxDiscount: 5000,
    usageLimit: 500,
    usageCount: 0,
    totalSales: 0,
    status: "scheduled",
  },
  {
    id: "PROMO-003",
    name: "Black Friday Agricole",
    description: "Remises exceptionnelles sur tout le catalogue",
    type: "percentage",
    value: 30,
    startDate: "2024-11-24T00:00:00",
    endDate: "2024-11-24T23:59:59",
    products: ["Tous les produits"],
    minPurchase: 100000,
    maxDiscount: 200000,
    usageLimit: 2000,
    usageCount: 1850,
    totalSales: 15000000,
    status: "expired",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
  },
  scheduled: {
    label: "Programmée",
    variant: "secondary" as const,
  },
  expired: {
    label: "Expirée",
    variant: "outline" as const,
  },
};

export function PromotionList({
  status,
  searchQuery,
  sortBy,
}: PromotionListProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrer et trier les promotions
  const filteredPromotions = promotions
    .filter((promotion) => {
      const matchesStatus = status === "all" || promotion.status === status;
      const matchesSearch =
        promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promotion.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "startDate":
          return (
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
          );
        case "endDate":
          return (
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
        case "discount":
          return b.value - a.value;
        case "usage":
          return (
            b.usageCount / b.usageLimit - a.usageCount / a.usageLimit
          );
        default:
          return 0;
      }
    });

  return (
    <>
      <div className="space-y-4">
        {filteredPromotions.map((promotion) => (
          <Card key={promotion.id} className="p-6">
            <div className="flex items-start justify-between">
              {/* Info principale */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{promotion.name}</h3>
                    <Badge
                      variant={
                        statusConfig[promotion.status as keyof typeof statusConfig]
                          .variant
                      }
                    >
                      {
                        statusConfig[promotion.status as keyof typeof statusConfig]
                          .label
                      }
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {promotion.description}
                  </p>
                </div>

                {/* Détails de la promotion */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Remise</p>
                    <p className="text-lg">
                      {promotion.type === "percentage"
                        ? `${promotion.value}%`
                        : formatCurrency(promotion.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Période</p>
                    <p className="text-sm">
                      Du {formatDate(promotion.startDate)}
                      <br />
                      Au {formatDate(promotion.endDate)}
                    </p>
                  </div>
                </div>

                {/* Produits */}
                <div>
                  <p className="text-sm font-medium mb-2">
                    Produits concernés
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {promotion.products.map((product) => (
                      <Badge key={product} variant="secondary">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Achat minimum</p>
                    <p>{formatCurrency(promotion.minPurchase)}</p>
                  </div>
                  <div>
                    <p className="font-medium">Remise maximum</p>
                    <p>{formatCurrency(promotion.maxDiscount)}</p>
                  </div>
                </div>

                {/* Utilisation */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">
                      Utilisation ({promotion.usageCount}/
                      {promotion.usageLimit})
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (promotion.usageCount / promotion.usageLimit) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (promotion.usageCount / promotion.usageLimit) * 100
                    }
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {formatCurrency(promotion.totalSales)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ventes totales
                </p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-4"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSelectedPromotion(promotion)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Dupliquer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="mr-2 h-4 w-4" />
                      Désactiver
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog des détails */}
      {selectedPromotion && (
        <PromotionDetailsDialog
          promotion={selectedPromotion}
          open={!!selectedPromotion}
          onOpenChange={() => setSelectedPromotion(null)}
        />
      )}
    </>
  );
}
