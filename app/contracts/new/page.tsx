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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const contractFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères",
  }),
  type: z.string({
    required_error: "Veuillez sélectionner un type de contrat",
  }),
  startDate: z.date({
    required_error: "Une date de début est requise",
  }),
  endDate: z.date({
    required_error: "Une date de fin est requise",
  }),
  value: z.string().min(1, {
    message: "La valeur du contrat est requise",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  terms: z.string().min(10, {
    message: "Les termes doivent contenir au moins 10 caractères",
  }),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

export default function NewContractPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      title: "",
      description: "",
      terms: "",
      value: "",
    },
  });

  async function onSubmit(data: ContractFormValues) {
    setIsSubmitting(true);
    try {
      // Ici, nous ferions normalement un appel API pour sauvegarder le contrat
      console.log(data);
      toast({
        title: "Contrat créé",
        description: "Votre contrat a été créé avec succès.",
      });
      // Redirection vers la liste des contrats
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du contrat.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Créer un Nouveau Contrat</h1>
            <p className="text-muted-foreground">
              Remplissez les informations ci-dessous pour créer un nouveau contrat agricole
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du Contrat</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Contrat de fourniture de maïs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de Contrat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de contrat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="supply">Contrat de Fourniture</SelectItem>
                        <SelectItem value="distribution">Contrat de Distribution</SelectItem>
                        <SelectItem value="partnership">Contrat de Partenariat</SelectItem>
                        <SelectItem value="lease">Contrat de Location</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de Début</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de Fin</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valeur du Contrat (FCFA)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 1000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez les détails du contrat..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Termes et Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Spécifiez les termes et conditions du contrat..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Création en cours..." : "Créer le Contrat"}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
