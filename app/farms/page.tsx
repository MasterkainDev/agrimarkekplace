import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FarmList } from "@/components/farms/farm-list";
import { FarmFilters } from "@/components/farms/farm-filters";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function FarmsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Farm Listings</h1>
            <p className="text-muted-foreground">
              Browse available farms or list your own property
            </p>
          </div>
          <Button asChild>
            <Link href="/farms/new">
              <Plus className="mr-2 h-4 w-4" /> List Your Farm
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          <FarmFilters />
          <div className="md:col-span-3">
            <FarmList />
          </div>
        </div>
      </div>
    </div>
  );
}