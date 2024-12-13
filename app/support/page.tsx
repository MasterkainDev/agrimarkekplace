"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQ } from "@/components/support/faq";
import { UserGuide } from "@/components/support/user-guide";
import { LiveChat } from "@/components/support/live-chat";
import { ContactForm } from "@/components/support/contact-form";
import { TicketList } from "@/components/support/ticket-list";
import { HelpSearch } from "@/components/support/help-search";
import {
  LifeBuoy,
  MessageSquare,
  FileText,
  HelpCircle,
  Mail,
  Ticket,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Centre d'Aide et Support
          </h1>
          <p className="text-muted-foreground">
            Trouvez de l'aide et des réponses à vos questions
          </p>
        </div>

        <HelpSearch />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Chat en Direct</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Discutez en temps réel avec notre équipe de support
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Documentation</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Guides détaillés et tutoriels
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Tickets Support</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Suivi de vos demandes de support
            </p>
          </Card>
        </div>

        <Tabs defaultValue="faq">
          <TabsList>
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guide">
              <FileText className="mr-2 h-4 w-4" />
              Guide d'utilisation
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat en Direct
            </TabsTrigger>
            <TabsTrigger value="tickets">
              <Ticket className="mr-2 h-4 w-4" />
              Mes Tickets
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-6">
            <FAQ />
          </TabsContent>

          <TabsContent value="guide" className="mt-6">
            <UserGuide />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <LiveChat />
          </TabsContent>

          <TabsContent value="tickets" className="mt-6">
            <TicketList />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
