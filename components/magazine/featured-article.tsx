import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { AuthorAvatar } from "./author-avatar";

export function FeaturedArticle() {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
            alt="Modern African Agriculture"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-primary/10">Premium</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>10 min read</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Revolutionizing African Agriculture Through Technology
            </h2>
            <p className="text-muted-foreground">
              Discover how innovative farming techniques and smart technologies are 
              transforming agricultural practices across the continent.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <AuthorAvatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              name="Dr. Sarah Johnson"
              size="md"
            />
            <Button asChild>
              <Link href="/magazine/tech-revolution">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}