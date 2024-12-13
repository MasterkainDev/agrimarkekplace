"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import Link from "next/link";

interface Contract {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  value: number;
  status: "active" | "pending" | "completed" | "terminated";
  parties: {
    name: string;
    role: string;
  }[];
}

const mockContracts: Contract[] = [
  {
    id: "1",
    title: "Contrat de Fourniture de Maïs",
    type: "supply",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    value: 1500000,
    status: "active",
    parties: [
      { name: "Ferme Diallo", role: "Fournisseur" },
      { name: "AgriProcess SA", role: "Acheteur" },
    ],
  },
  {
    id: "2",
    title: "Location Terrain Agricole",
    type: "lease",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    value: 800000,
    status: "pending",
    parties: [
      { name: "Propriété Kouassi", role: "Propriétaire" },
      { name: "Coopérative Agricole du Sud", role: "Locataire" },
    ],
  },
];

const statusColors = {
  active: "success",
  pending: "warning",
  completed: "default",
  terminated: "destructive",
};

const typeLabels = {
  supply: "Fourniture",
  distribution: "Distribution",
  partnership: "Partenariat",
  lease: "Location",
};

export function ContractList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parties</TableHead>
            <TableHead>Période</TableHead>
            <TableHead>Valeur (FCFA)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockContracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-medium">{contract.title}</TableCell>
              <TableCell>{typeLabels[contract.type as keyof typeof typeLabels]}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {contract.parties.map((party, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{party.name}</span>
                      <span className="text-muted-foreground"> ({party.role})</span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>Début: {new Date(contract.startDate).toLocaleDateString()}</div>
                  <div>Fin: {new Date(contract.endDate).toLocaleDateString()}</div>
                </div>
              </TableCell>
              <TableCell>{contract.value.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={statusColors[contract.status] as any}>
                  {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/contracts/${contract.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
