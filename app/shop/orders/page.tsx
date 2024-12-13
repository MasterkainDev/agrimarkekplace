"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Package, Truck, CheckCircle } from "lucide-react";

const orders = [
  {
    id: "ORD-123456",
    date: "2024-03-15",
    status: "delivered",
    total: 299.97,
    items: [
      {
        id: 1,
        name: "Premium Organic Fertilizer",
        quantity: 2,
        price: 49.99,
      },
      {
        id: 2,
        name: "Smart Irrigation System",
        quantity: 1,
        price: 199.99,
      },
    ],
  },
  {
    id: "ORD-123457",
    date: "2024-03-14",
    status: "shipped",
    total: 159.99,
    items: [
      {
        id: 3,
        name: "Professional Garden Tools Set",
        quantity: 1,
        price: 159.99,
      },
    ],
  },
];

const statusIcons = {
  pending: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  shipped: "bg-blue-500/10 text-blue-500",
  delivered: "bg-green-500/10 text-green-500",
};

export default function OrdersPage() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
            const statusColor = statusColors[order.status as keyof typeof statusColors];

            return (
              <Card key={order.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={statusColor}>
                      <StatusIcon className="mr-1 h-4 w-4" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">{formatPrice(order.total)}</p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Track Order</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}