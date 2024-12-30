import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SendFormData {
  recipient: string;
  amount: number;
}

const Send = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SendFormData>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: SendFormData) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // First, find the recipient's profile
      const { data: recipientProfile, error: recipientError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', data.recipient)
        .single();

      if (recipientError || !recipientProfile) {
        throw new Error("Recipient not found");
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          recipient_id: recipientProfile.id,
          type: 'send',
          amount: data.amount,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Money sent successfully",
        description: `$${data.amount} has been sent to ${data.recipient}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
              <Label htmlFor="recipient">Recipient Email</Label>
              <Input
                id="recipient"
                type="email"
                {...register("recipient", { required: "Recipient email is required" })}
                placeholder="Enter recipient's email"
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Send;