"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Filter } from "lucide-react";
import { useState } from "react";

// Mock data pour les factures
const invoices = [
  {
    id: "INV-001",
    date: "2024-12-10",
    dueDate: "2024-12-24",
    amount: 150000,
    status: "paid",
    customer: "Ferme Bio du Sud",
    items: ["Semences de maïs", "Engrais bio"],
  },
  {
    id: "INV-002",
    date: "2024-12-09",
    dueDate: "2024-12-23",
    amount: 75000,
    status: "pending",
    customer: "Coopérative Agricole",
    items: ["Pesticides naturels"],
  },
  {
    id: "INV-003",
    date: "2024-12-08",
    dueDate: "2024-12-22",
    amount: 225000,
    status: "overdue",
    customer: "Producteurs Unis",
    items: ["Équipement d'irrigation"],
  },
];

const statusConfig = {
  paid: {
    label: "Payée",
    variant: "default" as const,
  },
  pending: {
    label: "En attente",
    variant: "secondary" as const,
  },
  overdue: {
    label: "En retard",
    variant: "destructive" as const,
  },
};

export function InvoiceList() {
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

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Factures</h2>
          </div>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une facture..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.id}
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusConfig[invoice.status as keyof typeof statusConfig]
                          .variant
                      }
                    >
                      {
                        statusConfig[invoice.status as keyof typeof statusConfig]
                          .label
                      }
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
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
