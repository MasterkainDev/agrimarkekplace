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
import { format } from "date-fns"

interface OrderDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  order: {
    id: string
    date: Date
    status: string
    total: number
    items: Array<{
      id: string
      name: string
      quantity: number
      price: number
    }>
    shippingAddress: {
      street: string
      city: string
      state: string
      zip: string
    }
  }
}

export function OrderDetailsDialog({
  isOpen,
  onClose,
  order,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order #{order.id} - {format(order.date, "PPP")}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            <div>
              <h4 className="font-medium">Status</h4>
              <p className="text-sm text-muted-foreground capitalize">
                {order.status}
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-medium">Total</p>
              <p className="font-medium">${order.total.toFixed(2)}</p>
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
