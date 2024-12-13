"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const paymentSettingsSchema = z.object({
  defaultCurrency: z.string(),
  bankName: z.string().min(2, {
    message: "Le nom de la banque est requis",
  }),
  accountNumber: z.string().min(8, {
    message: "Le numéro de compte doit contenir au moins 8 caractères",
  }),
  accountHolder: z.string().min(2, {
    message: "Le nom du titulaire est requis",
  }),
  swiftCode: z.string().min(8, {
    message: "Le code SWIFT doit contenir au moins 8 caractères",
  }),
  mobileMoneyProvider: z.string(),
  mobileMoneyNumber: z.string().min(8, {
    message: "Le numéro Mobile Money doit contenir au moins 8 caractères",
  }),
});

type PaymentSettingsValues = z.infer<typeof paymentSettingsSchema>;

const currencies = [
  { value: "XOF", label: "Franc CFA (FCFA)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "Dollar US ($)" },
];

const mobileMoneyProviders = [
  { value: "orange", label: "Orange Money" },
  { value: "mtn", label: "MTN Mobile Money" },
  { value: "moov", label: "Moov Money" },
];

export default function PaymentSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PaymentSettingsValues>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      defaultCurrency: "XOF",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      swiftCode: "",
      mobileMoneyProvider: "",
      mobileMoneyNumber: "",
    },
  });

  async function onSubmit(data: PaymentSettingsValues) {
    setIsSubmitting(true);
    try {
      // Ici, nous ferions normalement un appel API pour sauvegarder les paramètres
      console.log(data);
      toast({
        title: "Paramètres mis à jour",
        description: "Vos paramètres de paiement ont été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Paramètres de Paiement</h1>
          <p className="text-muted-foreground">
            Configurez vos préférences de paiement et vos informations bancaires
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icons.CreditCard className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Préférences Générales</h2>
                </div>

                <FormField
                  control={form.control}
                  name="defaultCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Devise par défaut</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une devise" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icons.Building className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Informations Bancaires</h2>
                </div>

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la Banque</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: BICICI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de Compte</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: CI123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="swiftCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code SWIFT</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: BICICIAB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="accountHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulaire du Compte</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom complet du titulaire" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icons.Landmark className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Mobile Money</h2>
                </div>

                <FormField
                  control={form.control}
                  name="mobileMoneyProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opérateur Mobile Money</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un opérateur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mobileMoneyProviders.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileMoneyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro Mobile Money</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 0708090910" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Mise à jour..." : "Sauvegarder les paramètres"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
