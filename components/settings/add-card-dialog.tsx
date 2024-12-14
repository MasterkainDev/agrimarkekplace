"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function AddCardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une nouvelle carte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle carte</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle carte de paiement à votre compte.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="newCardNumber">Numéro de carte</Label>
            <Input
              id="newCardNumber"
              placeholder="1234 5678 9012 3456"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newExpiry">Date d'expiration</Label>
              <Input
                id="newExpiry"
                placeholder="MM/AA"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newCvc">CVC</Label>
              <Input
                id="newCvc"
                placeholder="123"
                type="text"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newCardName">Nom sur la carte</Label>
            <Input
              id="newCardName"
              placeholder="John Doe"
              type="text"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Ajouter la carte</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
