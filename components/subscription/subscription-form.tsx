"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import {
  subscriptionSchema,
  type SubscriptionFormData,
} from "@/lib/subscription";

interface SubscriptionFormProps {
  planId: string;
  onSuccess: () => void;
}

export function SubscriptionForm({ planId, onSuccess }: SubscriptionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { handleSubmit, register, formState: { errors } } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planId,
      paymentMethod: 'card',
      billingCycle: 'monthly',
    },
  });

  async function onSubmit(data: SubscriptionFormData) {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our service!",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Label>Payment Method</Label>
          <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="card" id="card" className="sr-only" />
              <Icons.creditCard className="mb-3 h-6 w-6" />
              <span className="text-sm font-medium">Card</span>
            </Label>
            <Label
              htmlFor="bitcoin"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="crypto" id="bitcoin" className="sr-only" />
              <Icons.crypto className="mb-3 h-6 w-6" />
              <span className="text-sm font-medium">Crypto</span>
            </Label>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Billing Cycle</Label>
          <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-4">
            <Label
              htmlFor="monthly"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
              <span className="text-sm font-medium">Monthly</span>
              <span className="text-sm text-muted-foreground">
                Billed monthly
              </span>
            </Label>
            <Label
              htmlFor="annual"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="annual" id="annual" className="sr-only" />
              <span className="text-sm font-medium">Annual</span>
              <span className="text-sm text-muted-foreground">
                Save 20%
              </span>
            </Label>
          </RadioGroup>
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Subscribe Now
        </Button>
      </form>
    </Card>
  );
}