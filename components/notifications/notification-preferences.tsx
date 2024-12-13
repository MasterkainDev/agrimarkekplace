"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Bell,
  ShoppingCart,
  Truck,
  AlertTriangle,
  Mail,
  MessageSquare,
  Smartphone,
  Percent,
} from "lucide-react";

const notificationPreferencesSchema = z.object({
  orderUpdates: z.boolean(),
  orderDelivery: z.boolean(),
  stockAlerts: z.boolean(),
  priceAlerts: z.boolean(),
  promotions: z.boolean(),
  newsletter: z.boolean(),
  chat: z.boolean(),
  smsNotifications: z.boolean(),
});

type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>;

const defaultValues: NotificationPreferences = {
  orderUpdates: true,
  orderDelivery: true,
  stockAlerts: true,
  priceAlerts: true,
  promotions: true,
  newsletter: false,
  chat: true,
  smsNotifications: false,
};

export function NotificationPreferences() {
  const form = useForm<NotificationPreferences>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues,
  });

  const onSubmit = async (data: NotificationPreferences) => {
    try {
      // TODO: Sauvegarder les préférences
      console.log(data);
      toast.success("Préférences de notifications mises à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des préférences");
    }
  };

  const preferences = [
    {
      id: "orderUpdates",
      label: "Mises à jour des commandes",
      description: "Notifications sur l'état et le traitement des commandes",
      icon: ShoppingCart,
    },
    {
      id: "orderDelivery",
      label: "Livraisons",
      description: "Notifications sur l'état des livraisons",
      icon: Truck,
    },
    {
      id: "stockAlerts",
      label: "Alertes de stock",
      description: "Notifications quand les produits suivis sont de retour en stock",
      icon: AlertTriangle,
    },
    {
      id: "priceAlerts",
      label: "Alertes de prix",
      description: "Notifications quand les prix des produits suivis changent",
      icon: Bell,
    },
    {
      id: "promotions",
      label: "Promotions",
      description: "Notifications sur les nouvelles promotions et offres spéciales",
      icon: Percent,
    },
    {
      id: "newsletter",
      label: "Newsletter",
      description: "Recevoir notre newsletter hebdomadaire",
      icon: Mail,
    },
    {
      id: "chat",
      label: "Messages",
      description: "Notifications des nouveaux messages",
      icon: MessageSquare,
    },
    {
      id: "smsNotifications",
      label: "Notifications SMS",
      description: "Recevoir les notifications importantes par SMS",
      icon: Smartphone,
    },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Préférences de Notifications
          </h2>
          <p className="text-muted-foreground">
            Gérez vos préférences de notifications pour rester informé de ce qui compte pour vous
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-4">
              {preferences.map(({ id, label, description, icon: Icon }) => (
                <FormField
                  key={id}
                  control={form.control}
                  name={id as keyof NotificationPreferences}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <FormLabel className="font-normal">
                            {label}
                          </FormLabel>
                        </div>
                        <FormDescription>{description}</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit">Enregistrer les préférences</Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
