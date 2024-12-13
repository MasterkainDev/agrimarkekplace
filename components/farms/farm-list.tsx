import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Ruler } from "lucide-react";

const farms = [
  {
    id: 1,
    title: "Fertile Valley Farm",
    location: "Nairobi Region, Kenya",
    size: "50 hectares",
    description: "Rich soil perfect for crop cultivation with irrigation system",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    price: "$200,000",
    slug: "fertile-valley-farm",
  },
  {
    id: 2,
    title: "Green Acres Estate",
    location: "Lagos State, Nigeria",
    size: "75 hectares",
    description: "Large agricultural estate with modern facilities",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    price: "$350,000",
    slug: "green-acres-estate",
  },
  {
    id: 3,
    title: "Sunset Ranch",
    location: "Western Cape, South Africa",
    size: "100 hectares",
    description: "Established ranch with excellent grazing lands",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    price: "$500,000",
    slug: "sunset-ranch",
  },
];

export function FarmList() {
  return (
    <div className="grid gap-6">
      {farms.map((farm) => (
        <Card key={farm.id} className="overflow-hidden">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative aspect-[4/3] md:col-span-1">
              <Image
                src={farm.image}
                alt={farm.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-6 md:col-span-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{farm.title}</h3>
                  <p className="text-lg font-semibold text-primary">
                    {farm.price}
                  </p>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {farm.location}
                  </div>
                  <div className="flex items-center">
                    <Ruler className="mr-1 h-4 w-4" />
                    {farm.size}
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {farm.description}
                </p>
              </div>
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/farms/${farm.slug}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}