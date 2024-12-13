import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandshakeIcon, Plus } from "lucide-react";
import Link from "next/link";
import { ContractsList } from "@/components/contracts/contracts-list";

export default function ContractsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Smart Contracts</h1>
            <p className="text-muted-foreground">
              Create and manage win-win partnerships effortlessly
            </p>
          </div>
          <Button asChild>
            <Link href="/contracts/new">
              <Plus className="mr-2 h-4 w-4" /> Create Contract
            </Link>
          </Button>
        </div>
        <ContractsList />
      </div>
    </div>
  );
}