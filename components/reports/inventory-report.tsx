"use client";

import {
  PieChart,
  Pie,
  Cell,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface InventoryReportProps {
  dateRange: string;
}

// Mock data pour les catégories de produits
const categoryData = [
  { name: "Céréales", value: 45, color: "#FF6B6B" },
  { name: "Légumes", value: 25, color: "#4ECDC4" },
  { name: "Fruits", value: 15, color: "#45B7D1" },
  { name: "Tubercules", value: 15, color: "#96CEB4" },
];

// Mock data pour les mouvements de stock
const stockMovements = [
  {
    date: "2024-12-10",
    product: "Maïs Premium",
    type: "entrée",
    quantity: 500,
    unit: "kg",
    reason: "Approvisionnement",
  },
  {
    date: "2024-12-09",
    product: "Tomates Bio",
    type: "sortie",
    quantity: 200,
    unit: "kg",
    reason: "Vente",
  },
  {
    date: "2024-12-08",
    product: "Riz Local",
    type: "entrée",
    quantity: 1000,
    unit: "kg",
    reason: "Approvisionnement",
  },
  // ... autres mouvements
];

// Mock data pour les alertes de stock
const stockAlerts = [
  {
    product: "Maïs Premium",
    currentStock: 50,
    minStock: 100,
    status: "low",
  },
  {
    product: "Tomates Bio",
    currentStock: 0,
    minStock: 75,
    status: "out",
  },
  {
    product: "Riz Local",
    currentStock: 80,
    minStock: 100,
    status: "low",
  },
];

export function InventoryReport({ dateRange }: InventoryReportProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-8">
      {/* Distribution des produits par catégorie */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Distribution par Catégorie
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  name,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-sm"
                    >
                      {name} ({value}%)
                    </text>
                  );
                }}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Alertes de stock */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Alertes de Stock</h3>
        <div className="space-y-4">
          {stockAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{alert.product}</h4>
                <p className="text-sm text-muted-foreground">
                  Stock actuel: {alert.currentStock} (Min: {alert.minStock})
                </p>
              </div>
              <Badge
                variant={alert.status === "out" ? "destructive" : "secondary"}
              >
                {alert.status === "out"
                  ? "Rupture de Stock"
                  : "Stock Faible"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Mouvements de stock récents */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Mouvements de Stock Récents
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Quantité</TableHead>
              <TableHead>Raison</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockMovements.map((movement, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(movement.date)}</TableCell>
                <TableCell>{movement.product}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      movement.type === "entrée" ? "default" : "secondary"
                    }
                  >
                    {movement.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {movement.quantity} {movement.unit}
                </TableCell>
                <TableCell>{movement.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
