"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatList } from "@/components/messages/chat-list";
import { ChatWindow } from "@/components/messages/chat-window";
import { NewMessageDialog } from "@/components/messages/new-message-dialog";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  // Mock data pour les conversations
  const conversations: {
    id: string;
    user: {
      name: string;
      avatar: string;
      status: "online" | "offline";
    };
    lastMessage: {
      text: string;
      timestamp: string;
      unread: boolean;
    };
  }[] = [
    {
      id: "1",
      user: {
        name: "Jean Kouassi",
        avatar: "/avatars/jean.jpg",
        status: "online",
      },
      lastMessage: {
        text: "Bonjour, je suis intéressé par vos semences de maïs...",
        timestamp: "10:30",
        unread: true,
      },
    },
    {
      id: "2",
      user: {
        name: "Marie Koffi",
        avatar: "/avatars/marie.jpg",
        status: "offline",
      },
      lastMessage: {
        text: "D'accord, je vous envoie les détails du contrat.",
        timestamp: "Hier",
        unread: false,
      },
    },
    // ... autres conversations
  ];

  return (
    <div className="container py-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        {/* Liste des conversations */}
        <Card className="col-span-4 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Button size="sm" onClick={() => setIsNewMessageOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>

            <ScrollArea className="h-[calc(100vh-16rem)]">
              <ChatList
                conversations={conversations}
                selectedId={selectedChat}
                onSelect={setSelectedChat}
              />
            </ScrollArea>
          </div>
        </Card>

        {/* Fenêtre de chat */}
        <Card className="col-span-8 p-0 flex flex-col">
          {selectedChat ? (
            <ChatWindow
              chatId={selectedChat}
              onClose={() => setSelectedChat(null)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Sélectionnez une conversation
                </h3>
                <p className="text-muted-foreground">
                  Choisissez une conversation dans la liste ou démarrez une nouvelle
                  discussion.
                </p>
                <Button onClick={() => setIsNewMessageOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau message
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <NewMessageDialog
        open={isNewMessageOpen}
        onOpenChange={setIsNewMessageOpen}
        onSelect={(userId) => {
          setSelectedChat(userId);
          setIsNewMessageOpen(false);
        }}
      />
    </div>
  );
}
