import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe, CreditCard, PiggyBank, Lock } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-8 w-8 text-mint-500" />,
    title: "Secure Transactions",
    description: "Bank-grade encryption and security protocols to protect your money",
  },
  {
    icon: <Zap className="h-8 w-8 text-mint-500" />,
    title: "Instant Transfers",
    description: "Send and receive money instantly, anywhere in the world",
  },
  {
    icon: <Globe className="h-8 w-8 text-mint-500" />,
    title: "Global Coverage",
    description: "Access your money from anywhere, with competitive exchange rates",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-mint-500" />,
    title: "Virtual Cards",
    description: "Create virtual cards for secure online shopping",
  },
  {
    icon: <PiggyBank className="h-8 w-8 text-mint-500" />,
    title: "Smart Savings",
    description: "Automated savings tools to help you reach your goals faster",
  },
  {
    icon: <Lock className="h-8 w-8 text-mint-500" />,
    title: "Advanced Security",
    description: "Multi-factor authentication and real-time fraud detection",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-mint-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-6">Why Choose Cashora?</h2>
          <p className="text-xl text-muted-foreground">
            Experience banking reimagined with features designed for the modern world
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-mint-50 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;