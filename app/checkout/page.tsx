"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck, MapPin } from "lucide-react";

const deliveryMethods = [
  {
    id: "standard",
    title: "Livraison Standard",
    description: "Livraison sous 3-5 jours ouvrés",
    price: 5.99,
  },
  {
    id: "express",
    title: "Livraison Express",
    description: "Livraison sous 24-48h",
    price: 12.99,
  },
];

const paymentMethods = [
  {
    id: "card",
    title: "Carte bancaire",
    description: "Paiement sécurisé par carte",
    icon: CreditCard,
  },
  {
    id: "cash",
    title: "Paiement à la livraison",
    description: "Payez en espèces à la réception",
    icon: Truck,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0].id);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous ajouterions la logique de traitement du paiement
    router.push("/checkout/confirmation");
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paiement</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Adresse de livraison */}
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Adresse de livraison
                </h2>
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input id="postalCode" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
              </Card>

              {/* Méthode de livraison */}
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Méthode de livraison</h2>
                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={setDeliveryMethod}
                  className="space-y-4"
                >
                  {deliveryMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label
                        htmlFor={method.id}
                        className="flex flex-1 justify-between cursor-pointer"
                      >
                        <div>
                          <div className="font-medium">{method.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.description}
                          </div>
                        </div>
                        <div className="font-medium">{method.price.toFixed(2)} €</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </Card>

              {/* Méthode de paiement */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                        <Label
                          htmlFor={`payment-${method.id}`}
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <Icon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">{method.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                        <Input id="expiryDate" placeholder="MM/AA" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </form>
          </div>

          {/* Résumé de la commande */}
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Articles du panier */}
                <div className="flex justify-between text-sm">
                  <span>2x Mangues Kent Premium</span>
                  <span>5.00 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>1x Tomates Bio</span>
                  <span>3.00 €</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>8.00 €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>5.99 €</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>13.99 €</span>
              </div>
              <Button className="w-full" type="submit">
                Confirmer la commande
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
