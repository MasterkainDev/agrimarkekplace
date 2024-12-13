"use client";

import { Card } from "@/components/ui/card";
import { Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";

interface InventoryStatsProps {
  stats: {
    totalProducts: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Produits
            </p>
            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-warning/10 rounded-full">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Stock Faible
            </p>
            <h3 className="text-2xl font-bold">{stats.lowStock}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-destructive/10 rounded-full">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Rupture de Stock
            </p>
            <h3 className="text-2xl font-bold">{stats.outOfStock}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-success/10 rounded-full">
            <DollarSign className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Valeur Totale
            </p>
            <h3 className="text-2xl font-bold">
              {formatCurrency(stats.totalValue)}
            </h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
