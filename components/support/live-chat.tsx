"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal, Paperclip, Image as ImageIcon } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  agentName?: string;
  agentAvatar?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Bonjour, comment puis-je vous aider aujourd'hui ?",
    sender: "agent",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    agentName: "Sarah",
    agentAvatar: "/avatars/sarah.jpg",
  },
  {
    id: "2",
    content: "J'ai une question concernant ma dernière commande",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: "3",
    content: "Bien sûr, pouvez-vous me donner le numéro de votre commande ?",
    sender: "agent",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    agentName: "Sarah",
    agentAvatar: "/avatars/sarah.jpg",
  },
];

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simuler une réponse de l'agent
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je vérifie cela pour vous tout de suite...",
        sender: "agent",
        timestamp: new Date().toISOString(),
        agentName: "Sarah",
        agentAvatar: "/avatars/sarah.jpg",
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/sarah.jpg" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Sarah</p>
            <p className="text-sm text-muted-foreground">
              Agent de support • En ligne
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {message.sender === "agent" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.agentAvatar} />
                    <AvatarFallback>
                      {message.agentName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
