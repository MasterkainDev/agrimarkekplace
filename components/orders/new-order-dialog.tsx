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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

const orderFormSchema = z.object({
  customerId: z.string({
    required_error: "Veuillez sélectionner un client",
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        unit: z.string(),
      })
    )
    .min(1, "Ajoutez au moins un produit"),
  deliveryAddress: z.string().min(5, "Adresse de livraison invalide"),
  deliveryDate: z.string().min(1, "Date de livraison requise"),
  notes: z.string().optional(),
});

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data pour les clients
const customers = [
  { id: "1", name: "Jean Kouassi", type: "Détaillant" },
  { id: "2", name: "Marie Koffi", type: "Grossiste" },
  { id: "3", name: "Ibrahim Diallo", type: "Détaillant" },
];

// Mock data pour les produits
const products = [
  {
    id: "1",
    name: "Maïs Premium",
    price: 250,
    unit: "kg",
    stock: 1000,
  },
  {
    id: "2",
    name: "Riz Local",
    price: 400,
    unit: "kg",
    stock: 2000,
  },
  {
    id: "3",
    name: "Tomates Bio",
    price: 500,
    unit: "kg",
    stock: 500,
  },
];

export function NewOrderDialog({
  open,
  onOpenChange,
}: NewOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerId: "",
      items: [],
      deliveryAddress: "",
      deliveryDate: "",
      notes: "",
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const addItem = () => {
    setOrderItems([
      ...orderItems,
      { productId: "", quantity: 1, unit: "kg" },
    ]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderItems(newItems);

    // Mettre à jour le formulaire
    form.setValue("items", newItems);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implémenter la création de la commande
      console.log(values);
      toast.success("Commande créée avec succès");
      form.reset();
      setOrderItems([]);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création de la commande"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Commande</DialogTitle>
          <DialogDescription>
            Créez une nouvelle commande en sélectionnant un client et des
            produits.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Sélection du client */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} ({customer.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Liste des produits */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Produits</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un produit
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item, index) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Select
                            value={item.productId}
                            onValueChange={(value) =>
                              updateItem(index, "productId", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un produit" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem
                                  key={product.id}
                                  value={product.id}
                                >
                                  {product.name} (Stock:{" "}
                                  {product.stock} {product.unit})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "quantity",
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {product
                            ? formatCurrency(product.price)
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {product
                            ? formatCurrency(
                                product.price * item.quantity
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {orderItems.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-right">
                        Total
                      </TableCell>
                      <TableCell className="font-bold">
                        {formatCurrency(calculateTotal())}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Adresse de livraison */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse de livraison</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date de livraison */}
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de livraison souhaitée</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notes ou instructions spéciales"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Instructions particulières pour la commande
                  </FormDescription>
                  <FormMessage />
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
                {isLoading ? "Création..." : "Créer la commande"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
