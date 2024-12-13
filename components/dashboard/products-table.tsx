"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data pour les produits
const products = [
  {
    id: 1,
    name: "Maïs Premium",
    category: "Céréales",
    price: 15000,
    sales: 450,
    revenue: 6750000,
    trend: "up",
  },
  {
    id: 2,
    name: "Tomates Bio",
    category: "Légumes",
    price: 8000,
    sales: 320,
    revenue: 2560000,
    trend: "down",
  },
  {
    id: 3,
    name: "Riz Local",
    category: "Céréales",
    price: 12000,
    sales: 280,
    revenue: 3360000,
    trend: "up",
  },
  {
    id: 4,
    name: "Ignames",
    category: "Tubercules",
    price: 5000,
    sales: 250,
    revenue: 1250000,
    trend: "up",
  },
  {
    id: 5,
    name: "Arachides",
    category: "Légumineuses",
    price: 10000,
    sales: 200,
    revenue: 2000000,
    trend: "down",
  },
];

export function ProductsTable() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produit</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead className="text-right">Prix Unitaire</TableHead>
          <TableHead className="text-right">Ventes</TableHead>
          <TableHead className="text-right">Revenu</TableHead>
          <TableHead className="text-right">Tendance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">{product.category}</Badge>
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(product.price)}
            </TableCell>
            <TableCell className="text-right">{product.sales}</TableCell>
            <TableCell className="text-right">
              {formatPrice(product.revenue)}
            </TableCell>
            <TableCell className="text-right">
              {product.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success inline-block" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive inline-block" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
