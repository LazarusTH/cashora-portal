import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

interface SendFormData {
  recipient: string;
  amount: number;
}

const Send = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SendFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: SendFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement send money logic with Supabase
      console.log("Send money data:", data);
      toast({
        title: "Money sent successfully",
        description: `$${data.amount} has been sent to ${data.recipient}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send money. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Send Money</h1>
          <p className="text-gray-500 mt-2">Transfer funds to another user</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Username/Email</Label>
              <Input
                id="recipient"
                {...register("recipient", { required: "Recipient is required" })}
                placeholder="Enter recipient's username or email"
              />
              {errors.recipient && (
                <p className="text-sm text-red-500">{errors.recipient.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                {...register("amount", { 
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be greater than 0" }
                })}
                placeholder="Enter amount to send"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Send;