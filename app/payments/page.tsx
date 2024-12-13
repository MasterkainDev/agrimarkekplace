import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bitcoin, CreditCard, Wallet } from "lucide-react";
import { PaymentMethods } from "@/components/payments/payment-methods";
import { CryptoRates } from "@/components/payments/crypto-rates";
import { TransactionHistory } from "@/components/payments/transaction-history";
import { InvoiceList } from "@/components/payments/invoice-list";

export default function PaymentsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground">
            Options de paiement sécurisées et flexibles pour vos investissements agricoles
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Wallet className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Votre Solde</h2>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">2,450,000 FCFA</p>
                <p className="text-sm text-muted-foreground">
                  Disponible pour les achats et abonnements
                </p>
              </div>
              <div className="flex space-x-4">
                <Button>Ajouter des fonds</Button>
                <Button variant="outline">Retirer</Button>
              </div>
            </div>
          </Card>

          <CryptoRates />
        </div>

        <PaymentMethods />
        
        <TransactionHistory />
        
        <InvoiceList />
      </div>
    </div>
  );
}