"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/classifieds";

export function ListingFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input placeholder="Search listings..." />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="pt-2">
            <Slider
              defaultValue={[0, 1000000]}
              max={1000000}
              step={1000}
              className="mb-6"
            />
            <div className="flex items-center space-x-4">
              <Input type="number" placeholder="Min" />
              <span>to</span>
              <Input type="number" placeholder="Max" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="kenya">Kenya</SelectItem>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="south-africa">South Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </div>
    </Card>
  );
}