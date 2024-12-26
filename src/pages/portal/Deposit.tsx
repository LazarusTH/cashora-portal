import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

interface DepositFormData {
  fullName: string;
  amount: number;
  receipt: FileList;
}

const Deposit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DepositFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: DepositFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement deposit logic with Supabase
      console.log("Deposit data:", data);
      toast({
        title: "Deposit request submitted",
        description: "We'll process your request and notify you via email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit deposit request. Please try again.",
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
          <h1 className="text-3xl font-bold">Deposit Funds</h1>
          <p className="text-gray-500 mt-2">Submit a deposit request with proof of payment</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Full name is required" })}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
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
                placeholder="Enter deposit amount"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Upload Receipt</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Input
                  id="receipt"
                  type="file"
                  {...register("receipt", { required: "Receipt is required" })}
                  className="hidden"
                />
                <label
                  htmlFor="receipt"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                </label>
              </div>
              {errors.receipt && (
                <p className="text-sm text-red-500">{errors.receipt.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Deposit Request"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Deposit;