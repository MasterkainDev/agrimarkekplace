"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewFarmPage() {
  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">List Your Farm</h1>
            <p className="text-muted-foreground">
              Provide details about your agricultural property
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Farm Name</Label>
              <Input id="title" placeholder="Enter farm name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="south-africa">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (hectares)</Label>
              <Input
                id="size"
                type="number"
                placeholder="Enter farm size"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter asking price"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your farm and its features"
                rows={5}
              />
            </div>

            <Button className="w-full">Submit Listing</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}