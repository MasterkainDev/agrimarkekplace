"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter } from "lucide-react";

// Mock data - Dans un cas réel, ces données viendraient d'une API
const transactions = [
  {
    id: "TR001",
    date: "2024-01-10",
    type: "payment",
    description: "Paiement pour Tracteur Massey Ferguson",
    amount: 1500000,
    status: "completed",
    paymentMethod: "bank_transfer",
  },
  {
    id: "TR002",
    date: "2024-01-08",
    type: "refund",
    description: "Remboursement commande #45678",
    amount: -50000,
    status: "completed",
    paymentMethod: "mobile_money",
  },
  {
    id: "TR003",
    date: "2024-01-05",
    type: "payment",
    description: "Achat de semences de maïs",
    amount: 250000,
    status: "pending",
    paymentMethod: "card",
  },
  // ... autres transactions
];

const statusColors = {
  completed: "success",
  pending: "warning",
  failed: "destructive",
};

const statusLabels = {
  completed: "Complété",
  pending: "En attente",
  failed: "Échoué",
};

const paymentMethodLabels = {
  bank_transfer: "Virement bancaire",
  mobile_money: "Mobile Money",
  card: "Carte bancaire",
};

export default function TransactionHistoryPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Historique des Transactions</h1>
            <p className="text-muted-foreground">
              Consultez et gérez vos transactions
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {/* Filtres */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une transaction..."
                    className="pl-8"
                  />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="payment">Paiement</SelectItem>
                  <SelectItem value="refund">Remboursement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table des transactions */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {paymentMethodLabels[transaction.paymentMethod as keyof typeof paymentMethodLabels]}
                      </TableCell>
                      <TableCell className={transaction.amount < 0 ? "text-destructive" : "text-success"}>
                        {transaction.amount.toLocaleString()} FCFA
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[transaction.status as keyof typeof statusColors] as any}>
                          {statusLabels[transaction.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de 1-10 sur 50 transactions
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
