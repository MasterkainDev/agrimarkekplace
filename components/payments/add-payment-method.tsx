"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CreditCard, Wallet2, Phone } from "lucide-react";

const paymentMethodSchema = z.object({
  type: z.string({
    required_error: "Veuillez sélectionner un type de paiement",
  }),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  details: z.string().min(1, "Ce champ est requis"),
  setAsDefault: z.boolean().default(false),
});

interface AddPaymentMethodProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPaymentMethod({
  open,
  onOpenChange,
}: AddPaymentMethodProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: "",
      name: "",
      details: "",
      setAsDefault: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    try {
      setIsLoading(true);
      // TODO: Implémenter l'ajout du moyen de paiement
      console.log(values);
      toast.success("Moyen de paiement ajouté avec succès");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de l'ajout du moyen de paiement"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailsLabel = (type: string) => {
    switch (type) {
      case "card":
        return "Numéro de carte";
      case "mobile":
        return "Numéro de téléphone";
      case "bank":
        return "IBAN";
      default:
        return "Détails";
    }
  };

  const getDetailsPlaceholder = (type: string) => {
    switch (type) {
      case "card":
        return "4242 4242 4242 4242";
      case "mobile":
        return "+225 XX XX XX XX XX";
      case "bank":
        return "CI XX XXXX XXXX XXXX XXXX XXXX XXX";
      default:
        return "Entrez les détails";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un moyen de paiement</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau moyen de paiement à votre compte.
            Vos informations sont sécurisées et cryptées.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de paiement</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="card">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Carte bancaire</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Mobile Money</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="bank">
                        <div className="flex items-center space-x-2">
                          <Wallet2 className="h-4 w-4" />
                          <span>Compte bancaire</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du moyen de paiement</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Ma carte principale"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Un nom pour identifier facilement ce moyen de paiement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getDetailsLabel(form.watch("type"))}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={getDetailsPlaceholder(
                        form.watch("type")
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setAsDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Définir comme moyen de paiement par défaut
                    </FormLabel>
                    <FormDescription>
                      Ce moyen de paiement sera utilisé automatiquement
                      pour vos futures transactions
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Ajout..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
