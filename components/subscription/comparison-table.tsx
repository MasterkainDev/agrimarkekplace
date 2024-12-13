import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  {
    name: "Accès au contenu numérique",
    monthly: true,
    yearly: true,
    premium: true,
  },
  {
    name: "Magazine papier mensuel",
    monthly: true,
    yearly: true,
    premium: true,
  },
  {
    name: "Articles premium",
    monthly: true,
    yearly: true,
    premium: true,
  },
  {
    name: "Accès aux archives",
    monthly: false,
    yearly: true,
    premium: true,
  },
  {
    name: "Contenus exclusifs",
    monthly: false,
    yearly: true,
    premium: true,
  },
  {
    name: "Webinaires mensuels",
    monthly: false,
    yearly: false,
    premium: true,
  },
  {
    name: "Support prioritaire",
    monthly: false,
    yearly: false,
    premium: true,
  },
  {
    name: "Accès anticipé aux événements",
    monthly: false,
    yearly: false,
    premium: true,
  },
];

export function ComparisonTable() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Fonctionnalités</TableHead>
            <TableHead className="text-center">Pack Mensuel</TableHead>
            <TableHead className="text-center">Pack Annuel</TableHead>
            <TableHead className="text-center">Pack Premium+</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {feature.monthly ? (
                  <Check className="h-5 w-5 text-primary mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {feature.yearly ? (
                  <Check className="h-5 w-5 text-primary mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {feature.premium ? (
                  <Check className="h-5 w-5 text-primary mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
