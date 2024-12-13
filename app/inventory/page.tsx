"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Download } from "lucide-react";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { InventoryStats } from "@/components/inventory/inventory-stats";
import { NewProductDialog } from "@/components/inventory/new-product-dialog";

// Mock data pour les statistiques
const stats = {
  totalProducts: 156,
  lowStock: 12,
  outOfStock: 3,
  totalValue: 15000000, // en FCFA
};

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showNewProduct, setShowNewProduct] = useState(false);

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
            <p className="text-muted-foreground">
              Gérez votre inventaire et suivez vos produits
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button onClick={() => setShowNewProduct(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Produit
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <InventoryStats stats={stats} />

        {/* Filtres et Recherche */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="cereals">Céréales</SelectItem>
                <SelectItem value="vegetables">Légumes</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="tubers">Tubercules</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Tableau d'inventaire */}
        <Card className="p-6">
          <InventoryTable
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
          />
        </Card>
      </div>

      {/* Dialog pour nouveau produit */}
      <NewProductDialog
        open={showNewProduct}
        onOpenChange={setShowNewProduct}
        onSubmit={(data) => {
          console.log("New product data:", data);
          setShowNewProduct(false);
        }}
      />
    </div>
  );
}
