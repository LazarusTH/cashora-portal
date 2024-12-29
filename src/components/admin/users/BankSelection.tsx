import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Bank {
  id: number;
  name: string;
}

interface BankSelectionProps {
  userId: number;
  userName: string;
  availableBanks: Bank[];
  selectedBanks: string[];
  onClose: () => void;
}

export const BankSelection = ({
  userId,
  userName,
  availableBanks,
  selectedBanks,
  onClose,
}: BankSelectionProps) => {
  const [selected, setSelected] = useState<string[]>(selectedBanks);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Banks updated",
      description: `Bank assignments updated for ${userName}`,
    });
    onClose();
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-1 gap-3">
          {availableBanks.map((bank) => (
            <Card key={bank.id} className="p-4 bg-dark-200 border-dark-100 hover:bg-dark-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`bank-${bank.id}`}
                    checked={selected.includes(bank.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelected([...selected, bank.name]);
                      } else {
                        setSelected(selected.filter((name) => name !== bank.name));
                      }
                    }}
                    className="border-brand-orange data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                  />
                  <Label htmlFor={`bank-${bank.id}`} className="text-gray-300 text-sm font-medium">{bank.name}</Label>
                </div>
                <div className="text-xs text-gray-500">
                  {selected.includes(bank.name) ? "Selected" : "Not selected"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">Save Changes</Button>
      </div>
    </div>
  );
};