"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Ban,
} from "lucide-react";
import { OrderDetailsDialog } from "./order-details-dialog";

interface OrderListProps {
  status: string;
  searchQuery: string;
  sortBy: string;
}

// Mock data pour les commandes
const orders = [
  {
    id: "CMD-001",
    date: "2024-12-10T10:30:00",
    customer: {
      name: "Jean Kouassi",
      avatar: "/avatars/jean.jpg",
      type: "Détaillant",
    },
    items: [
      { name: "Maïs Premium", quantity: 500, unit: "kg", price: 250 },
      { name: "Riz Local", quantity: 200, unit: "kg", price: 400 },
    ],
    total: 205000,
    status: "pending",
    paymentStatus: "pending",
    deliveryAddress: "Abidjan, Cocody",
  },
  {
    id: "CMD-002",
    date: "2024-12-09T15:45:00",
    customer: {
      name: "Marie Koffi",
      avatar: "/avatars/marie.jpg",
      type: "Grossiste",
    },
    items: [
      { name: "Tomates Bio", quantity: 300, unit: "kg", price: 500 },
      { name: "Oignons", quantity: 400, unit: "kg", price: 300 },
    ],
    total: 270000,
    status: "processing",
    paymentStatus: "paid",
    deliveryAddress: "Yamoussoukro, Centre",
  },
  {
    id: "CMD-003",
    date: "2024-12-08T09:15:00",
    customer: {
      name: "Ibrahim Diallo",
      avatar: "/avatars/ibrahim.jpg",
      type: "Détaillant",
    },
    items: [
      { name: "Mangues", quantity: 200, unit: "kg", price: 350 },
      { name: "Ananas", quantity: 150, unit: "kg", price: 400 },
    ],
    total: 130000,
    status: "delivered",
    paymentStatus: "paid",
    deliveryAddress: "Bouaké, Centre",
  },
];

const statusConfig = {
  pending: {
    label: "En attente",
    variant: "secondary" as const,
    icon: Clock,
  },
  processing: {
    label: "En traitement",
    variant: "default" as const,
    icon: Package,
  },
  shipped: {
    label: "Expédiée",
    variant: "secondary" as const,
    icon: Truck,
  },
  delivered: {
    label: "Livrée",
    variant: "default" as const,
    icon: CheckCircle,
  },
  cancelled: {
    label: "Annulée",
    variant: "destructive" as const,
    icon: XCircle,
  },
};

export function OrderList({ status, searchQuery, sortBy }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrer et trier les commandes
  const filteredOrders = orders
    .filter((order) => {
      const matchesStatus = status === "all" || order.status === status;
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        case "amount":
          return b.total - a.total;
        case "status":
          return a.status.localeCompare(b.status);
        case "customer":
          return a.customer.name.localeCompare(b.customer.name);
        default:
          return 0;
      }
    });

  return (
    <>
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
          
          return (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between">
                {/* Info principale */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge
                          variant={
                            statusConfig[order.status as keyof typeof statusConfig]
                              .variant
                          }
                          className="flex items-center"
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {
                            statusConfig[order.status as keyof typeof statusConfig]
                              .label
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback>
                        {order.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.type}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Produits</p>
                    <div className="mt-1 space-y-1">
                      {order.items.map((item, index) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {item.quantity} {item.unit} {item.name} à{" "}
                          {formatCurrency(item.price)}/{item.unit}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Prix et actions */}
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {formatCurrency(order.total)}
                  </p>
                  <Badge
                    variant={
                      order.paymentStatus === "paid"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {order.paymentStatus === "paid"
                      ? "Payé"
                      : "En attente"}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-4"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Générer la facture
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Annuler la commande
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Dialog des détails */}
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
