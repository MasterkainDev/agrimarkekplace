"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="w-full">
        <Icons.github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}