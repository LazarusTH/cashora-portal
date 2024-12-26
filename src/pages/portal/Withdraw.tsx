import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

interface WithdrawFormData {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const Withdraw = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: WithdrawFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement withdrawal logic with Supabase
      console.log("Withdrawal data:", data);
      toast({
        title: "Withdrawal request submitted",
        description: "We'll process your request and notify you via email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit withdrawal request. Please try again.",
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
          <h1 className="text-3xl font-bold">Withdraw Funds</h1>
          <p className="text-gray-500 mt-2">Submit a withdrawal request to your bank account</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                {...register("amount", { 
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be greater than 0" }
                })}
                placeholder="Enter withdrawal amount"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                {...register("bankName", { required: "Bank name is required" })}
                placeholder="Enter your bank name"
              />
              {errors.bankName && (
                <p className="text-sm text-red-500">{errors.bankName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                {...register("accountNumber", { required: "Account number is required" })}
                placeholder="Enter your account number"
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                {...register("accountName", { required: "Account name is required" })}
                placeholder="Enter account holder name"
              />
              {errors.accountName && (
                <p className="text-sm text-red-500">{errors.accountName.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;