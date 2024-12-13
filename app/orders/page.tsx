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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderList } from "@/components/orders/order-list";
import { NewOrderDialog } from "@/components/orders/new-order-dialog";
import { OrderFilters } from "@/components/orders/order-filters";
import { OrderStats } from "@/components/orders/order-stats";

export default function OrdersPage() {
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [status, setStatus] = useState("all");

  return (
    <div className="container py-8 space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Commandes</h1>
          <p className="text-muted-foreground">
            Gérez vos commandes et suivez leur état
          </p>
        </div>
        <Button onClick={() => setIsNewOrderOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Commande
        </Button>
      </div>

      {/* Statistiques */}
      <OrderStats />

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une commande..."
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
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Montant</SelectItem>
              <SelectItem value="status">Statut</SelectItem>
              <SelectItem value="customer">Client</SelectItem>
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

      {/* Onglets de statut */}
      <Tabs value={status} onValueChange={setStatus}>
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="processing">En cours</TabsTrigger>
          <TabsTrigger value="shipped">Expédiées</TabsTrigger>
          <TabsTrigger value="delivered">Livrées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrderList
            status="all"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
        <TabsContent value="pending">
          <OrderList
            status="pending"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
        <TabsContent value="processing">
          <OrderList
            status="processing"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
        <TabsContent value="shipped">
          <OrderList
            status="shipped"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
        <TabsContent value="delivered">
          <OrderList
            status="delivered"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderList
            status="cancelled"
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <NewOrderDialog
        open={isNewOrderOpen}
        onOpenChange={setIsNewOrderOpen}
      />
      <OrderFilters
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
      />
    </div>
  );
}
