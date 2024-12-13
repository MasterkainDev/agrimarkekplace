import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bitcoin,
  CreditCard,
  Wallet,
  Plus,
  CheckCircle2,
} from "lucide-react";

const paymentMethods = [
  {
    id: 1,
    type: "Bitcoin",
    icon: Bitcoin,
    address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
    default: true,
  },
  {
    id: 2,
    type: "Credit Card",
    icon: CreditCard,
    last4: "4242",
    expiry: "12/24",
  },
  {
    id: 3,
    type: "Wallet",
    icon: Wallet,
    balance: "$2,450.00",
  },
];

export function PaymentMethods() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{method.type}</p>
                    {method.default && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Default</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {method.address || 
                     (method.last4 && `•••• ${method.last4}`) ||
                     method.balance}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}