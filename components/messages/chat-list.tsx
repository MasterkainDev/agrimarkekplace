"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatListProps {
  conversations: Array<{
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
  }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ChatList({ conversations, selectedId, onSelect }: ChatListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
            selectedId === conversation.id && "bg-accent"
          )}
          onClick={() => onSelect(conversation.id)}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
              <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                conversation.user.status === "online"
                  ? "bg-success"
                  : "bg-muted"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate">{conversation.user.name}</p>
              <span className="text-xs text-muted-foreground">
                {conversation.lastMessage.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage.text}
              </p>
              {conversation.lastMessage.unread && (
                <Badge variant="default" className="ml-2">
                  Nouveau
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
