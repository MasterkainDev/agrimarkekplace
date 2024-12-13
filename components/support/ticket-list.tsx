"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { useSupport } from "@/lib/hooks/use-support";
import {
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  Clock,
  MoreVertical,
  ArrowDownCircle,
  MinusCircle,
  AlertOctagon,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, listItem } from "@/lib/animations";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: "general" | "technical" | "billing" | "other";
  status: "open" | "pending" | "resolved" | "closed";
  created_at: string;
}

const statusConfig = {
  open: {
    label: "Ouvert",
    variant: "secondary" as const,
  },
  pending: {
    label: "En attente",
    variant: "default" as const,
  },
  resolved: {
    label: "Résolu",
    variant: "outline" as const,
  },
  closed: {
    label: "Fermé",
    variant: "secondary" as const,
  },
};

const priorityConfig = {
  low: {
    label: "Basse",
    variant: "secondary" as const,
    icon: ArrowDownCircle,
  },
  medium: {
    label: "Moyenne",
    variant: "default" as const,
    icon: MinusCircle,
  },
  high: {
    label: "Haute",
    variant: "destructive" as const,
    icon: AlertCircle,
  },
  urgent: {
    label: "Urgente",
    variant: "destructive" as const,
    icon: AlertOctagon,
  },
};

export function TicketList() {
  const { tickets, getTickets, updateTicket, isLoading } = useSupport();

  useEffect(() => {
    getTickets();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <Card className="p-6">
        <motion.div variants={staggerContainer} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Mes Tickets
              </h2>
              <p className="text-muted-foreground">
                Gérez vos demandes de support
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Ticket
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un ticket..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="open">Ouverts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="resolved">Résolus</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Dernière mise à jour</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Chargement des tickets...
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ) : tickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Aucun ticket trouvé
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((ticket, i) => (
                      <motion.tr
                        key={ticket.id}
                        variants={listItem}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <TableCell className="font-medium">
                          {ticket.id}
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              priorityConfig[
                                ticket.priority as keyof typeof priorityConfig
                              ].variant
                            }
                          >
                            {
                              priorityConfig[
                                ticket.priority as keyof typeof priorityConfig
                              ].label
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusConfig[
                                ticket.status as keyof typeof statusConfig
                              ].variant
                            }
                          >
                            {
                              statusConfig[
                                ticket.status as keyof typeof statusConfig
                              ].label
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{ticket.message}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(ticket.created_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Répondre
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateTicket(ticket.id, "closed")
                                }
                              >
                                Fermer le ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
