"use client";

import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data pour les statistiques
const stats = {
  totalOrders: {
    value: 1250,
    change: 12.5,
    period: "vs mois dernier",
  },
  pendingOrders: 45,
  processingOrders: 78,
  shippedOrders: 124,
  deliveredOrders: 980,
  cancelledOrders: 23,
  totalRevenue: {
    value: 75000000,
    change: 8.2,
    period: "vs mois dernier",
  },
};

export function OrderStats() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Total des commandes */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Commandes
            </p>
            <h3 className="text-2xl font-bold">{stats.totalOrders.value}</h3>
          </div>
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.totalOrders.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.totalOrders.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.totalOrders.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>

      {/* Chiffre d'affaires */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Chiffre d'Affaires
            </p>
            <h3 className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue.value)}
            </h3>
          </div>
          <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge
            variant={stats.totalRevenue.change >= 0 ? "default" : "destructive"}
            className="flex items-center"
          >
            {stats.totalRevenue.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(stats.totalRevenue.change)}%
          </Badge>
          <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
        </div>
      </Card>

      {/* Statuts des commandes */}
      <Card className="p-6 col-span-2">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          Statut des Commandes
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm">En attente</span>
              </div>
              <span className="font-bold">{stats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">En cours</span>
              </div>
              <span className="font-bold">{stats.processingOrders}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-sm">Expédiées</span>
              </div>
              <span className="font-bold">{stats.shippedOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Livrées</span>
              </div>
              <span className="font-bold">{stats.deliveredOrders}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm">Annulées</span>
              </div>
              <span className="font-bold">{stats.cancelledOrders}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
