"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationSettings } from "@/components/notifications/notification-settings";
import { Bell, Settings, Filter } from "lucide-react";

// Mock data pour les notifications
const notifications: {
  id: string;
  type: "alert" | "info" | "success" | "warning";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: string;
}[] = [
  {
    id: "1",
    type: "success",
    title: "Nouvelle commande reçue",
    message: "Votre commande #123 a été confirmée et est en cours de traitement.",
    timestamp: "Il y a 5 minutes",
    read: false,
    category: "orders",
  },
  {
    id: "2",
    type: "info",
    title: "Mise à jour du profil",
    message: "Votre profil a été mis à jour avec succès.",
    timestamp: "Il y a 2 heures",
    read: true,
    category: "profile",
  },
  {
    id: "3",
    type: "warning",
    title: "Stock faible",
    message: "Le stock de maïs est presque épuisé. Pensez à le réapprovisionner.",
    timestamp: "Il y a 1 jour",
    read: false,
    category: "inventory",
  },
  {
    id: "4",
    type: "alert",
    title: "Paiement en attente",
    message: "Le paiement pour la commande #456 est en attente depuis 48 heures.",
    timestamp: "Il y a 2 jours",
    read: true,
    category: "payments",
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.category === filter;
  });

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Gérez vos notifications et préférences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="unread">Non lues</SelectItem>
                <SelectItem value="inventory">Stock</SelectItem>
                <SelectItem value="orders">Commandes</SelectItem>
                <SelectItem value="payments">Paiements</SelectItem>
                <SelectItem value="weather">Météo</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des notifications */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={(id) => {
                  // Implémenter la logique pour marquer comme lu
                  console.log("Marking as read:", id);
                }}
                onDelete={(id) => {
                  // Implémenter la logique de suppression
                  console.log("Deleting:", id);
                }}
              />
            </Card>
          </div>

          {/* Paramètres des notifications */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">
                    Paramètres des Notifications
                  </h2>
                </div>
                <NotificationSettings />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
