"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Info,
  CheckCircle2,
  Bell,
  MoreVertical,
  CheckCheck,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "alert" | "info" | "success" | "warning";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(
          (now.getTime() - date.getTime()) / (1000 * 60)
        );
        return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
      }
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
    }

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "info":
        return <Info className="h-5 w-5 text-primary" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune notification
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start space-x-4 p-4 rounded-lg transition-colors",
                notification.read
                  ? "bg-background"
                  : "bg-muted/50",
                "hover:bg-muted/80"
              )}
            >
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{notification.title}</p>
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!notification.read && (
                    <DropdownMenuItem
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Marquer comme lu
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(notification.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
