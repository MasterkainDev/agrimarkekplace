"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import Image from "next/image";

const inventoryData = [
  {
    id: 1,
    name: "Mangues Kent",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
    stock: 150,
    unit: "kg",
    price: 2.5,
    status: "En stock",
  },
  {
    id: 2,
    name: "Tomates Bio",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b11",
    stock: 25,
    unit: "kg",
    price: 3.0,
    status: "Stock faible",
  },
  {
    id: 3,
    name: "Maïs",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
    stock: 500,
    unit: "kg",
    price: 1.8,
    status: "En stock",
  },
];

export function ProductInventory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Inventaire des Produits</CardTitle>
        <Button variant="outline">Gérer l'inventaire</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryData.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.price.toFixed(2)} €/{product.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{product.stock} {product.unit}</p>
                  <Badge 
                    variant={product.status === "En stock" ? "default" : "destructive"}
                    className="mt-1"
                  >
                    {product.status === "Stock faible" && (
                      <AlertTriangle className="mr-1 h-3 w-3" />
                    )}
                    {product.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
