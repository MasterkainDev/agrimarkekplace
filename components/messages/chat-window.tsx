"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Paperclip,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatWindowProps {
  chatId: string;
  onClose: () => void;
}

// Mock data pour les messages
const messages = [
  {
    id: "1",
    sender: {
      id: "user1",
      name: "Jean Kouassi",
      avatar: "/avatars/jean.jpg",
    },
    content: "Bonjour, je suis intéressé par vos semences de maïs. Quel est le prix au kilo ?",
    timestamp: "10:30",
    type: "text",
  },
  {
    id: "2",
    sender: {
      id: "user2",
      name: "Vous",
      avatar: "/avatars/you.jpg",
    },
    content: "Bonjour ! Le prix est de 1000 FCFA/kg pour une commande minimale de 50kg.",
    timestamp: "10:32",
    type: "text",
  },
  {
    id: "3",
    sender: {
      id: "user1",
      name: "Jean Kouassi",
      avatar: "/avatars/jean.jpg",
    },
    content: "C'est parfait. Je voudrais commander 100kg. Pouvez-vous me faire un devis ?",
    timestamp: "10:35",
    type: "text",
  },
  // ... autres messages
];

export function ChatWindow({ chatId, onClose }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      // Ici, nous enverrions normalement le message via une API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/jean.jpg" alt="Jean Kouassi" />
            <AvatarFallback>JK</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Jean Kouassi</h3>
            <p className="text-sm text-muted-foreground">En ligne</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>Rechercher dans la conversation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Bloquer le contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.name === "Vous" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex space-x-2 max-w-[70%]">
                {message.sender.name !== "Vous" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={message.sender.avatar}
                      alt={message.sender.name}
                    />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {message.sender.name !== "Vous" && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {message.sender.name}
                    </p>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender.name === "Vous"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
