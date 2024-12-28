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
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableBanks.map((bank) => (
            <Card key={bank.id} className="p-4">
              <div className="flex items-center space-x-2">
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
                />
                <Label htmlFor={`bank-${bank.id}`}>{bank.name}</Label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};