import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Tag, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface PromotionDetailsDialogProps {
  promotion: {
    id: string;
    title: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    location: string;
    discount: number;
    participantsCount: number;
    maxParticipants: number;
    status: "active" | "scheduled" | "ended";
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromotionDetailsDialog({
  promotion,
  open,
  onOpenChange,
}: PromotionDetailsDialogProps) {
  const progress = (promotion.participantsCount / promotion.maxParticipants) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{promotion.title}</DialogTitle>
            <Badge
              variant={
                promotion.status === "active"
                  ? "default"
                  : promotion.status === "scheduled"
                  ? "secondary"
                  : "outline"
              }
            >
              {promotion.status === "active"
                ? "Active"
                : promotion.status === "scheduled"
                ? "Planifiée"
                : "Terminée"}
            </Badge>
          </div>
          <DialogDescription>{promotion.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Catégorie:</span>
              <span className="text-sm font-medium">{promotion.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Période:</span>
              <span className="text-sm font-medium">
                {promotion.startDate} - {promotion.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Lieu:</span>
              <span className="text-sm font-medium">{promotion.location}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Participants</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {promotion.participantsCount} / {promotion.maxParticipants}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button>Participer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
