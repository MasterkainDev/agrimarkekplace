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

export function FarmFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Location</h3>
          <Select defaultValue="all">
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

        <div className="space-y-2">
          <h3 className="font-semibold">Price Range</h3>
          <Slider
            defaultValue={[0, 1000000]}
            max={1000000}
            step={10000}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$1M</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Farm Size (hectares)</h3>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Small (0-50 ha)</SelectItem>
              <SelectItem value="medium">Medium (51-200 ha)</SelectItem>
              <SelectItem value="large">Large (201+ ha)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Features</h3>
          <div className="flex items-center space-x-2">
            <Switch id="irrigation" />
            <Label htmlFor="irrigation">Irrigation System</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="storage" />
            <Label htmlFor="storage">Storage Facilities</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="equipment" />
            <Label htmlFor="equipment">Equipment Included</Label>
          </div>
        </div>
      </div>
    </Card>
  );
}