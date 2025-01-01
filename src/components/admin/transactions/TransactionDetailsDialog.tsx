import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, Send, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: number;
  client: {
    name: string;
    email: string;
  };
  type: string;
  recipient?: {
    name: string;
    email: string;
  };
  amount: number;
  date: string;
  status: string;
  receipt_url?: string;
}

interface TransactionDetailsDialogProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailsDialog = ({ transaction, onClose }: TransactionDetailsDialogProps) => {
  if (!transaction) return null;

  return (
    <Dialog open={!!transaction} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-500">Transaction Type</Label>
            <div className="flex items-center gap-2">
              {transaction.type === "deposit" && <ArrowDownRight className="h-5 w-5 text-green-400" />}
              {transaction.type === "withdrawal" && <ArrowUpRight className="h-5 w-5 text-red-400" />}
              {transaction.type === "send" && <Send className="h-5 w-5 text-blue-400" />}
              <span className="capitalize">{transaction.type}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Amount</Label>
            <p className="text-lg font-medium">${transaction.amount.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Status</Label>
            <Badge 
              variant={
                transaction.status === "accepted" ? "default" :
                transaction.status === "rejected" ? "destructive" : "secondary"
              }
              className="animate-fade-in"
            >
              {transaction.status}
            </Badge>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Date</Label>
            <p>{format(new Date(transaction.date), "PPP")}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Client</Label>
            <div>
              <p className="font-medium">{transaction.client.name}</p>
              <p className="text-sm text-gray-500">{transaction.client.email}</p>
            </div>
          </div>
          {transaction.recipient && (
            <div className="space-y-2">
              <Label className="text-gray-500">Recipient</Label>
              <div>
                <p className="font-medium">{transaction.recipient.name}</p>
                <p className="text-sm text-gray-500">{transaction.recipient.email}</p>
              </div>
            </div>
          )}
          {transaction.receipt_url && (
            <div className="col-span-2 space-y-2">
              <Label className="text-gray-500">Receipt</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => window.open(transaction.receipt_url, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Receipt
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};