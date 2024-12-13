"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTwoFactorToggle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Two-factor authentication updated",
        description: "Your security settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Security Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account security preferences
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              disabled={isLoading}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>

          <div className="space-y-4">
            <Label>Active Sessions</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Chrome on MacOS</p>
                  <p className="text-xs text-muted-foreground">
                    Last active: 2 minutes ago
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Safari on iPhone</p>
                  <p className="text-xs text-muted-foreground">
                    Last active: 5 days ago
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}