"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, MoreVertical, Trash2, History } from "lucide-react";

// Mock data pour les produits
const products = [
  {
    id: "1",
    name: "Maïs Premium",
    sku: "CORN-001",
    category: "cereals",
    quantity: 150,
    unit: "kg",
    minStock: 100,
    price: 15000,
    lastUpdated: "2024-12-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Tomates Bio",
    sku: "TOM-001",
    category: "vegetables",
    quantity: 50,
    unit: "kg",
    minStock: 75,
    price: 8000,
    lastUpdated: "2024-12-09T15:30:00Z",
  },
  // ... autres produits
];

interface InventoryTableProps {
  searchQuery: string;
  categoryFilter: string;
}

export function InventoryTable({
  searchQuery,
  categoryFilter,
}: InventoryTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Rupture</Badge>;
    }
    if (quantity < minStock) {
      return <Badge variant="secondary">Stock Faible</Badge>;
    }
    return <Badge variant="default">En Stock</Badge>;
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aValue < bValue ? -direction : direction;
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produit</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead className="text-right">Quantité</TableHead>
          <TableHead className="text-right">Prix Unitaire</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Dernière Mise à Jour</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {product.quantity} {product.unit}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(product.price)}
            </TableCell>
            <TableCell>
              {getStockStatus(product.quantity, product.minStock)}
            </TableCell>
            <TableCell>{formatDate(product.lastUpdated)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    Historique
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
