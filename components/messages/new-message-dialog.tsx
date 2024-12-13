"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (userId: string) => void;
}

// Mock data pour les contacts
const contacts = [
  {
    id: "1",
    name: "Jean Kouassi",
    avatar: "/avatars/jean.jpg",
    title: "Agriculteur",
    location: "Yamoussoukro",
  },
  {
    id: "2",
    name: "Marie Koffi",
    avatar: "/avatars/marie.jpg",
    title: "Fournisseur",
    location: "Abidjan",
  },
  {
    id: "3",
    name: "Ibrahim Diallo",
    avatar: "/avatars/ibrahim.jpg",
    title: "Distributeur",
    location: "Bouaké",
  },
  // ... autres contacts
];

export function NewMessageDialog({
  open,
  onOpenChange,
  onSelect,
}: NewMessageDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un contact..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => onSelect(contact.id)}
                >
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="truncate">{contact.title}</span>
                      <span className="mx-1">•</span>
                      <span className="truncate">{contact.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
