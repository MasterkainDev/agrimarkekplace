"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationList } from "./notification-list";
import { NotificationPreferences } from "./notification-preferences";
import { Button } from "@/components/ui/button";
import { Bell, Settings, CheckCheck, Filter } from "lucide-react";

// Mock data pour les notifications
const mockNotifications = [
  {
    id: "1",
    type: "success" as const,
    title: "Commande confirmée",
    message: "Votre commande #123 a été confirmée et est en cours de traitement",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    category: "order",
  },
  {
    id: "2",
    type: "alert" as const,
    title: "Stock faible",
    message: "Le stock de 'Semences de Maïs Bio' est presque épuisé",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    category: "stock",
  },
  {
    id: "3",
    type: "info" as const,
    title: "Nouvelle promotion",
    message: "Profitez de -20% sur tous les engrais biologiques",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    category: "promotion",
  },
  {
    id: "4",
    type: "warning" as const,
    title: "Alerte météo",
    message: "Fortes pluies prévues dans votre région dans les prochains jours",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    read: true,
    category: "weather",
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const filterNotifications = (category: string) => {
    if (category === "all") return notifications;
    if (category === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.category === category);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Centre de Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              Toutes
              <span className="ml-2 text-xs">
                ({notifications.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Non lues
              <span className="ml-2 text-xs">({unreadCount})</span>
            </TabsTrigger>
            <TabsTrigger value="order">Commandes</TabsTrigger>
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="promotion">Promotions</TabsTrigger>
            <TabsTrigger value="weather">Météo</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <NotificationList
              notifications={filterNotifications("all")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="unread" className="mt-6">
            <NotificationList
              notifications={filterNotifications("unread")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="order" className="mt-6">
            <NotificationList
              notifications={filterNotifications("order")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="stock" className="mt-6">
            <NotificationList
              notifications={filterNotifications("stock")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="promotion" className="mt-6">
            <NotificationList
              notifications={filterNotifications("promotion")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="weather" className="mt-6">
            <NotificationList
              notifications={filterNotifications("weather")}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
