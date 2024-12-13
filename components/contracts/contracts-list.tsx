"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandshakeIcon, ArrowRight, Calendar, Users } from "lucide-react";
import Link from "next/link";

const contracts = [
  {
    id: 1,
    title: "Farm Lease Agreement",
    type: "Lease",
    parties: ["John Doe Farms", "AgriCorp Ltd"],
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    description: "Annual lease agreement for 50 hectares of farmland",
  },
  {
    id: 2,
    title: "Crop Sharing Partnership",
    type: "Partnership",
    parties: ["Green Valley Farms", "Local Cooperative"],
    status: "Pending",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    description: "Seasonal crop sharing agreement with profit distribution",
  },
  {
    id: 3,
    title: "Equipment Lease Contract",
    type: "Equipment",
    parties: ["Smith Agricultural", "Farm Equipment Co."],
    status: "Draft",
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    description: "Lease agreement for farming equipment and machinery",
  },
];

export function ContractsList() {
  return (
    <div className="grid gap-6">
      {contracts.map((contract) => (
        <Card key={contract.id} className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{contract.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {contract.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  contract.status === "Active" ? "text-green-600" :
                  contract.status === "Pending" ? "text-yellow-600" :
                  "text-gray-600"
                }`}>
                  {contract.status}
                </span>
                <Button asChild variant="outline">
                  <Link href={`/contracts/${contract.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {contract.parties.join(" • ")}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}