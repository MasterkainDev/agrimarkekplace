"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface SupplierFiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupplierFilters({ open, onOpenChange }: SupplierFiltersProps) {
  if (!open) return null

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            placeholder="Search suppliers..."
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Category</h3>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="seeds">Seeds</SelectItem>
              <SelectItem value="fertilizers">Fertilizers</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="pesticides">Pesticides</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Location</h3>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Sort By</h3>
          <Select defaultValue="rating-desc">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
              <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}
