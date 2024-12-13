"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Category</h3>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fertilizers">Fertilizers</SelectItem>
              <SelectItem value="seeds">Seeds</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Price Range</h3>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Availability</h3>
          <div className="flex items-center space-x-2">
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In Stock Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="free-shipping" />
            <Label htmlFor="free-shipping">Free Shipping</Label>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Supplier Rating</h3>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4plus">4+ Stars</SelectItem>
              <SelectItem value="3plus">3+ Stars</SelectItem>
              <SelectItem value="2plus">2+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}