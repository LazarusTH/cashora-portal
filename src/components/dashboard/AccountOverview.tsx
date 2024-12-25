import { Card } from "@/components/ui/card";

export const AccountOverview = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
      <Card className="p-6 glass-card hover-scale">
        <h3 className="text-lg font-medium text-muted-foreground">Balance</h3>
        <p className="text-3xl font-bold mt-2">$10,000.00</p>
      </Card>
      
      <Card className="p-6 glass-card hover-scale">
        <h3 className="text-lg font-medium text-muted-foreground">
          Pending Transactions
        </h3>
        <p className="text-3xl font-bold mt-2">3</p>
      </Card>
      
      <Card className="p-6 glass-card hover-scale">
        <h3 className="text-lg font-medium text-muted-foreground">
          Total Transactions
        </h3>
        <p className="text-3xl font-bold mt-2">125</p>
      </Card>
    </div>
  );
};