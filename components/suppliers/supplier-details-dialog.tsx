"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SupplierDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  supplier: {
    id: string
    name: string
    logo: string
    description: string
    rating: number
    categories: string[]
    location: {
      address: string
      city: string
      state: string
      country: string
    }
    contact: {
      email: string
      phone: string
      website: string
    }
  }
}

export function SupplierDetailsDialog({
  isOpen,
  onClose,
  supplier,
}: SupplierDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={supplier.logo} alt={supplier.name} />
              <AvatarFallback>{supplier.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{supplier.name}</DialogTitle>
              <DialogDescription>
                Rating: {supplier.rating} / 5
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            <div>
              <h4 className="font-medium">About</h4>
              <p className="text-sm text-muted-foreground">
                {supplier.description}
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {supplier.categories.map((category) => (
                  <div
                    key={category}
                    className="rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <div className="text-sm text-muted-foreground">
                <p>{supplier.location.address}</p>
                <p>
                  {supplier.location.city}, {supplier.location.state}
                </p>
                <p>{supplier.location.country}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Email: {supplier.contact.email}</p>
                <p>Phone: {supplier.contact.phone}</p>
                <p>Website: {supplier.contact.website}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
