"use client";

import { useState } from "react";
import { Plus, Search, Filter, Calendar } from "lucide-react";
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
import { PromotionList } from "@/components/promotions/promotion-list";
import { NewPromotionDialog } from "@/components/promotions/new-promotion-dialog";
import { PromotionFilters } from "@/components/promotions/promotion-filters";
import { PromotionStats } from "@/components/promotions/promotion-stats";
import { PromotionCalendar } from "@/components/promotions/promotion-calendar";

export default function PromotionsPage() {
  const [isNewPromotionOpen, setIsNewPromotionOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("startDate");
  const [view, setView] = useState("list");
  const [status, setStatus] = useState("all");

  return (
    <div className="container py-8 space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promotions</h1>
          <p className="text-muted-foreground">
            Gérez vos offres promotionnelles et remises
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setView(view === "list" ? "calendar" : "list")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {view === "list" ? "Vue Calendrier" : "Vue Liste"}
          </Button>
          <Button onClick={() => setIsNewPromotionOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Promotion
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <PromotionStats />

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une promotion..."
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
              <SelectItem value="startDate">Date de début</SelectItem>
              <SelectItem value="endDate">Date de fin</SelectItem>
              <SelectItem value="discount">Remise</SelectItem>
              <SelectItem value="usage">Utilisation</SelectItem>
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
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="scheduled">Programmées</TabsTrigger>
          <TabsTrigger value="expired">Expirées</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {view === "list" ? (
            <PromotionList
              status="all"
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          ) : (
            <PromotionCalendar status="all" />
          )}
        </TabsContent>
        <TabsContent value="active">
          {view === "list" ? (
            <PromotionList
              status="active"
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          ) : (
            <PromotionCalendar status="active" />
          )}
        </TabsContent>
        <TabsContent value="scheduled">
          {view === "list" ? (
            <PromotionList
              status="scheduled"
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          ) : (
            <PromotionCalendar status="scheduled" />
          )}
        </TabsContent>
        <TabsContent value="expired">
          {view === "list" ? (
            <PromotionList
              status="expired"
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          ) : (
            <PromotionCalendar status="expired" />
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <NewPromotionDialog
        open={isNewPromotionOpen}
        onOpenChange={setIsNewPromotionOpen}
      />
      <PromotionFilters
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
      />
    </div>
  );
}
