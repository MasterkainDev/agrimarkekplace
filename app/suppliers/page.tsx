"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupplierList } from "@/components/suppliers/supplier-list";
import { NewSupplierDialog } from "@/components/suppliers/new-supplier-dialog";
import { SupplierFilters } from "@/components/suppliers/supplier-filters";

export default function SuppliersPage() {
  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  return (
    <div className="container py-8 space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fournisseurs</h1>
          <p className="text-muted-foreground">
            Gérez vos fournisseurs et leurs produits
          </p>
        </div>
        <Button onClick={() => setIsNewSupplierOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Fournisseur
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un fournisseur..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="rating">Note</SelectItem>
              <SelectItem value="orders">Commandes</SelectItem>
              <SelectItem value="amount">Montant</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Liste des fournisseurs */}
      <SupplierList
        searchQuery={searchQuery}
        sortBy={sortBy}
      />

      {/* Dialogs */}
      <NewSupplierDialog
        open={isNewSupplierOpen}
        onOpenChange={setIsNewSupplierOpen}
      />
      <SupplierFilters
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
      />
    </div>
  );
}
