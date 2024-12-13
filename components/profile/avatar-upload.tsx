"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export function AvatarUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <p className="text-sm text-muted-foreground">
            Upload a profile picture to personalize your account
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative h-24 w-24">
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <Icons.user className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="relative"
                disabled={isLoading}
              >
                Choose File
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </Button>
              {preview && (
                <Button
                  size="sm"
                  onClick={handleUpload}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Upload
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}