"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data - Dans un cas réel, ces données viendraient d'une API
const mockContract = {
  id: "1",
  title: "Contrat de Fourniture de Maïs",
  type: "supply",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  value: 1500000,
  status: "active",
  description: "Contrat de fourniture de maïs entre la Ferme Diallo et AgriProcess SA...",
  terms: `
    1. Objet du contrat
    La Ferme Diallo s'engage à fournir à AgriProcess SA une quantité de 100 tonnes de maïs...

    2. Qualité des produits
    Le maïs fourni devra répondre aux critères de qualité suivants...

    3. Conditions de livraison
    Les livraisons seront effectuées selon le calendrier suivant...

    4. Prix et conditions de paiement
    Le prix est fixé à 1500 FCFA par kilogramme...
  `,
  parties: [
    {
      name: "Ferme Diallo",
      role: "Fournisseur",
      contact: "Mamadou Diallo",
      email: "diallo@ferme.com",
    },
    {
      name: "AgriProcess SA",
      role: "Acheteur",
      contact: "Sarah Koné",
      email: "kone@agriprocess.com",
    },
  ],
  documents: [
    {
      name: "Contrat signé",
      type: "pdf",
      size: "2.5 MB",
      url: "/documents/contract-1.pdf",
    },
    {
      name: "Annexe technique",
      type: "pdf",
      size: "1.2 MB",
      url: "/documents/annex-1.pdf",
    },
  ],
};

export default function ContractDetailPage() {
  const params = useParams();
  const contractId = params.id;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{mockContract.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={mockContract.status === "active" ? "default" : "destructive"}>
              {mockContract.status === "active" ? "Actif" : "Inactif"}
            </Badge>
            <span className="text-sm text-muted-foreground">ID: {contractId}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Résilier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Résilier le contrat</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir résilier ce contrat ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Annuler</Button>
                <Button variant="destructive">Confirmer la résiliation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <h2 className="text-xl font-semibold mb-4">Détails du contrat</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Type: {mockContract.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Période: {mockContract.startDate} - {mockContract.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Valeur: {mockContract.value.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Parties: {mockContract.parties.length}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{mockContract.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Termes et conditions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {mockContract.terms}
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Parties prenantes</h2>
            <div className="space-y-4">
              {mockContract.parties.map((party, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{party.name}</h3>
                    <Badge variant="outline">{party.role}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Contact: {party.contact}</p>
                    <p>Email: {party.email}</p>
                  </div>
                  {index < mockContract.parties.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-4">
              {mockContract.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
