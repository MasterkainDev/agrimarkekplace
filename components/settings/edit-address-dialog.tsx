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
import { Textarea } from "@/components/ui/textarea";

export function EditAddressDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Modifier l'adresse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier l'adresse de facturation</DialogTitle>
          <DialogDescription>
            Mettez à jour votre adresse de facturation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="street">Rue</Label>
            <Input
              id="street"
              defaultValue="123 Rue du Commerce"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="postalCode">Code postal</Label>
              <Input
                id="postalCode"
                defaultValue="75001"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                defaultValue="Paris"
                type="text"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              defaultValue="France"
              type="text"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Enregistrer les modifications</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
