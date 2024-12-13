import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { AuthorAvatar } from "../magazine/author-avatar";

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  rating: number;
}

export function TestimonialCard({ content, author, rating }: TestimonialCardProps) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <blockquote className="flex-grow">
        <p className="text-muted-foreground italic mb-6">{content}</p>
      </blockquote>
      <div className="flex items-center justify-between mt-4">
        <AuthorAvatar
          src={author.avatar}
          name={author.name}
          size="sm"
          showName={false}
        />
        <div className="text-right">
          <p className="font-semibold">{author.name}</p>
          <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
      </div>
    </Card>
  );
}
