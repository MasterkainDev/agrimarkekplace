"use client";

import { Badge } from "@/components/ui/badge";

interface InventoryBadgeProps {
  stock: number;
}

export function InventoryBadge({ stock }: InventoryBadgeProps) {
  if (stock === 0) {
    return (
      <Badge variant="destructive">Out of Stock</Badge>
    );
  }

  if (stock <= 5) {
    return (
      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
        Low Stock: {stock} left
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
      In Stock
    </Badge>
  );
}