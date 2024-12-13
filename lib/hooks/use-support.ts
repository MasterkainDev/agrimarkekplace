import { useState } from "react";
import { toast } from "sonner";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: "general" | "technical" | "billing" | "other";
  status: "open" | "pending" | "resolved" | "closed";
  created_at: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
}

export function useSupport() {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const createTicket = async (data: Omit<Ticket, "id" | "created_at" | "status">) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "create_ticket",
          data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const json = await response.json();
      setTickets((prev) => [json.ticket, ...prev]);
      toast.success("Ticket créé avec succès");
      return json.ticket;
    } catch (error) {
      toast.error("Erreur lors de la création du ticket");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitContactForm = async (data: ContactForm) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_form",
          data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      toast.success("Message envoyé avec succès");
      return true;
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "get_tickets",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const json = await response.json();
      setTickets(json.tickets);
      return json.tickets;
    } catch (error) {
      toast.error("Erreur lors de la récupération des tickets");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (ticketId: string, status: Ticket["status"]) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update_ticket",
          data: {
            ticket_id: ticketId,
            status,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const json = await response.json();
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? json.ticket : ticket
        )
      );
      toast.success("Ticket mis à jour avec succès");
      return json.ticket;
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du ticket");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    tickets,
    createTicket,
    submitContactForm,
    getTickets,
    updateTicket,
  };
}
