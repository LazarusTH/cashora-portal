import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
    // TODO: Implement actual bank assignment with backend
    toast({
      title: "Banks updated",
      description: `Bank assignments updated for ${userName}`,
    });
    onClose();
  };

  const handleDeleteUser = () => {
    if (confirm(`Are you sure you want to delete ${userName}?`)) {
      // TODO: Implement actual user deletion with backend
      toast({
        title: "User deleted",
        description: `${userName} has been removed from the system.`,
      });
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {availableBanks.map((bank) => (
          <div key={bank.id} className="flex items-center space-x-2">
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
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="destructive" onClick={handleDeleteUser}>
          Delete User
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};