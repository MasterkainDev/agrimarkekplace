"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Cloud,
  MessageSquare,
  Bell,
} from "lucide-react";

interface NotificationChannel {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const channels: NotificationChannel[] = [
  {
    id: "inventory",
    label: "Stock",
    description: "Alertes de niveau de stock et expirations",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "orders",
    label: "Commandes",
    description: "Nouvelles commandes et mises à jour",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    id: "payments",
    label: "Paiements",
    description: "Confirmations et échecs de paiement",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "weather",
    label: "Météo",
    description: "Alertes météorologiques importantes",
    icon: <Cloud className="h-4 w-4" />,
  },
  {
    id: "messages",
    label: "Messages",
    description: "Nouveaux messages des clients",
    icon: <MessageSquare className="h-4 w-4" />,
  },
];

export function NotificationSettings() {
  const [emailFrequency, setEmailFrequency] = useState("immediate");
  const [enabledChannels, setEnabledChannels] = useState<string[]>([
    "inventory",
    "orders",
    "payments",
  ]);

  const toggleChannel = (channelId: string) => {
    setEnabledChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Préférences générales */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Préférences Générales</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications Push</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications sur votre navigateur
              </p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
              aria-label="Toggle push notifications"
            />
          </div>
          <div className="space-y-2">
            <Label>Fréquence des Emails</Label>
            <Select value={emailFrequency} onValueChange={setEmailFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la fréquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immédiat</SelectItem>
                <SelectItem value="daily">Résumé quotidien</SelectItem>
                <SelectItem value="weekly">Résumé hebdomadaire</SelectItem>
                <SelectItem value="never">Jamais</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Canaux de notification */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Canaux de Notification</h3>
        <div className="space-y-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {channel.icon}
                </div>
                <div className="space-y-0.5">
                  <Label>{channel.label}</Label>
                  <p className="text-sm text-muted-foreground">
                    {channel.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={enabledChannels.includes(channel.id)}
                onCheckedChange={() => toggleChannel(channel.id)}
                aria-label={`Toggle ${channel.label} notifications`}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Notifications sonores */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Sons et Vibrations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sons de Notification</Label>
              <p className="text-sm text-muted-foreground">
                Jouer un son lors des notifications
              </p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
              aria-label="Toggle notification sounds"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Vibrations</Label>
              <p className="text-sm text-muted-foreground">
                Vibrer lors des notifications
              </p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
              aria-label="Toggle vibrations"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
