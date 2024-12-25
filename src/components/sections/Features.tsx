import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, RefreshCcw, PiggyBank } from "lucide-react";

const features = [
  {
    title: "Secure Transactions",
    description: "Bank-grade security for all your financial transactions",
    icon: Shield,
  },
  {
    title: "Instant Transfers",
    description: "Send and receive money in seconds, not days",
    icon: Zap,
  },
  {
    title: "Real-time Updates",
    description: "Track your money with live notifications and updates",
    icon: RefreshCcw,
  },
  {
    title: "Smart Savings",
    description: "Automated tools to help you save more effectively",
    icon: PiggyBank,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-mint-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-4">Why Choose Cashora?</h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of financial management
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-mint-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;