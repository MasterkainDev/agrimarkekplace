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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ImageUpload } from "@/components/ui/image-upload";

const classifiedFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  price: z.string().min(1, {
    message: "Le prix est requis",
  }),
  location: z.string().min(3, {
    message: "La localisation est requise",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  images: z.array(z.string()).min(1, {
    message: "Au moins une image est requise",
  }),
  contactName: z.string().min(2, {
    message: "Le nom du contact est requis",
  }),
  contactPhone: z.string().min(8, {
    message: "Un numéro de téléphone valide est requis",
  }),
  contactEmail: z.string().email({
    message: "Une adresse email valide est requise",
  }),
});

type ClassifiedFormValues = z.infer<typeof classifiedFormSchema>;

const categories = [
  { value: "equipment", label: "Matériel Agricole" },
  { value: "seeds", label: "Semences" },
  { value: "livestock", label: "Bétail" },
  { value: "fertilizers", label: "Engrais" },
  { value: "services", label: "Services" },
  { value: "land", label: "Terrains" },
  { value: "others", label: "Autres" },
];

export default function NewClassifiedPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<ClassifiedFormValues>({
    resolver: zodResolver(classifiedFormSchema),
    defaultValues: {
      title: "",
      price: "",
      location: "",
      description: "",
      images: [],
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  async function onSubmit(data: ClassifiedFormValues) {
    setIsSubmitting(true);
    try {
      // Ici, nous ferions normalement un appel API pour sauvegarder l'annonce
      console.log(data);
      toast({
        title: "Annonce créée",
        description: "Votre annonce a été publiée avec succès.",
      });
      // Redirection vers la liste des annonces
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication de l'annonce.",
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
            <h1 className="text-2xl font-bold">Publier une Nouvelle Annonce</h1>
            <p className="text-muted-foreground">
              Remplissez les informations ci-dessous pour publier votre annonce
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l'annonce</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tracteur agricole à vendre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (FCFA)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 500000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Abidjan, Cocody" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre produit ou service en détail..."
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={images}
                        onChange={(urls) => {
                          setImages(urls);
                          field.onChange(urls);
                        }}
                        onRemove={(url) => {
                          const newImages = images.filter((image) => image !== url);
                          setImages(newImages);
                          field.onChange(newImages);
                        }}
                        maxFiles={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Ajoutez jusqu'à 5 images de votre produit ou service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="font-medium">Informations de contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 0708090910" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre.email@exemple.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
