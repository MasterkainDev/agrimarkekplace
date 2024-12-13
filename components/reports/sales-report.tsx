"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SalesReportProps {
  dateRange: string;
}

// Mock data pour les ventes
const salesData = [
  { date: "Lun", sales: 1200000, orders: 25 },
  { date: "Mar", sales: 900000, orders: 18 },
  { date: "Mer", sales: 1500000, orders: 30 },
  { date: "Jeu", sales: 1800000, orders: 35 },
  { date: "Ven", sales: 2000000, orders: 40 },
  { date: "Sam", sales: 2500000, orders: 45 },
  { date: "Dim", sales: 1700000, orders: 32 },
];

// Mock data pour les produits les plus vendus
const topProducts = [
  { name: "Maïs Premium", sales: 450, revenue: 6750000 },
  { name: "Tomates Bio", sales: 320, revenue: 2560000 },
  { name: "Riz Local", sales: 280, revenue: 3360000 },
  { name: "Ignames", sales: 250, revenue: 1250000 },
  { name: "Arachides", sales: 200, revenue: 2000000 },
];

export function SalesReport({ dateRange }: SalesReportProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalSales / totalOrders;

  // Calcul de la croissance
  const previousPeriodSales = 10500000; // Mock data
  const growth = ((totalSales - previousPeriodSales) / previousPeriodSales) * 100;

  return (
    <div className="space-y-8">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Ventes Totales
            </p>
            <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
            <div className="flex items-center space-x-2">
              <Badge
                variant={growth >= 0 ? "default" : "destructive"}
                className="flex items-center"
              >
                {growth >= 0 ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {Math.abs(growth)}%
              </Badge>
              <p className="text-sm text-muted-foreground">par rapport au mois dernier</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Nombre de Commandes
            </p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Panier Moyen
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(averageOrderValue)}
            </p>
          </div>
        </Card>
      </div>

      {/* Graphique des ventes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Évolution des Ventes</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value: number, name) =>
                  name === "sales"
                    ? [formatCurrency(value), "Ventes"]
                    : [value, "Commandes"]
                }
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="Ventes"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="Commandes"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Produits les plus vendus */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Produits les Plus Vendus</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value: number, name) =>
                  name === "revenue"
                    ? [formatCurrency(value), "Revenu"]
                    : [value, "Ventes"]
                }
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="sales"
                name="Quantité Vendue"
                fill="hsl(var(--primary))"
              />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                name="Revenu"
                fill="hsl(var(--secondary))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
