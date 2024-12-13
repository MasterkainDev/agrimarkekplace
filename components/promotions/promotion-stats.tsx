"use client";

import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Tag,
  Users,
  ShoppingCart,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data pour les statistiques
const stats = {
  activePromotions: {
    value: 12,
    change: 20,
    period: "vs mois dernier",
  },
  totalSales: {
    value: 8500000,
    change: 15.3,
    period: "vs mois dernier",
  },
  usageRate: {
    value: 68,
    change: 5.2,
    period: "vs mois dernier",
  },
  averageDiscount: {
    value: 25,
    change: -2.1,
    period: "vs mois dernier",
  },
};

export function PromotionStats() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Promotions actives */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Promotions Actives
            </p>
            <h3 className="text-2xl font-bold">{stats.activePromotions.value}</h3>
          </div>
          <Tag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.activePromotions.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.activePromotions.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.activePromotions.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>

      {/* Ventes avec promotions */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ventes Promotionnelles
            </p>
            <h3 className="text-2xl font-bold">
              {formatCurrency(stats.totalSales.value)}
            </h3>
          </div>
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.totalSales.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.totalSales.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.totalSales.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>

      {/* Taux d'utilisation */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Taux d'Utilisation
            </p>
            <h3 className="text-2xl font-bold">{stats.usageRate.value}%</h3>
          </div>
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.usageRate.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.usageRate.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.usageRate.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>

      {/* Remise moyenne */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Remise Moyenne
            </p>
            <h3 className="text-2xl font-bold">{stats.averageDiscount.value}%</h3>
          </div>
          <Percent className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.averageDiscount.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.averageDiscount.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.averageDiscount.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>
    </div>
  );
}
