"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  ArrowDownUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  FileDown,
} from "lucide-react";

// Mock data pour les transactions
const transactions = [
  {
    id: "TRX-001",
    date: "2024-12-10",
    type: "purchase",
    description: "Achat de semences de maïs",
    amount: 150000,
    status: "completed",
    method: "wallet",
  },
  {
    id: "TRX-002",
    date: "2024-12-09",
    type: "deposit",
    description: "Dépôt via Mobile Money",
    amount: 500000,
    status: "completed",
    method: "mobile",
  },
  {
    id: "TRX-003",
    date: "2024-12-08",
    type: "withdrawal",
    description: "Retrait vers compte bancaire",
    amount: -200000,
    status: "pending",
    method: "bank",
  },
  {
    id: "TRX-004",
    date: "2024-12-07",
    type: "purchase",
    description: "Achat d'engrais bio",
    amount: 75000,
    status: "completed",
    method: "crypto",
  },
  {
    id: "TRX-005",
    date: "2024-12-06",
    type: "refund",
    description: "Remboursement commande #458",
    amount: 25000,
    status: "completed",
    method: "wallet",
  },
];

const statusConfig = {
  completed: {
    label: "Complété",
    variant: "default" as const,
  },
  pending: {
    label: "En attente",
    variant: "secondary" as const,
  },
  failed: {
    label: "Échoué",
    variant: "destructive" as const,
  },
};

export function TransactionHistory() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "refund":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      default:
        return <ArrowDownUp className="h-4 w-4" />;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "all" || transaction.type === filter;
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Historique des Transactions</h2>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une transaction..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les transactions</SelectItem>
              <SelectItem value="purchase">Achats</SelectItem>
              <SelectItem value="deposit">Dépôts</SelectItem>
              <SelectItem value="withdrawal">Retraits</SelectItem>
              <SelectItem value="refund">Remboursements</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.method}
                  </TableCell>
                  <TableCell
                    className={
                      transaction.amount >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusConfig[
                          transaction.status as keyof typeof statusConfig
                        ].variant
                      }
                    >
                      {
                        statusConfig[
                          transaction.status as keyof typeof statusConfig
                        ].label
                      }
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
