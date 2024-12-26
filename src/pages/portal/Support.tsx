import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const CASHORA_RESPONSES = {
  default: "Hello! I'm here to help you with any questions about Cashora's services.",
  deposit: "To make a deposit, go to the Deposit section in your dashboard. You can upload your receipt and we'll process it within 24 hours.",
  withdraw: "Withdrawals are processed within 1-2 business days. Make sure you've verified your bank account details.",
  send: "You can send money instantly to other Cashora users. Just use their email or username in the Send Money section.",
  fees: "Cashora charges 0% fees for deposits and transfers between Cashora users. Withdrawal fees vary by bank.",
};

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: CASHORA_RESPONSES.default,
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const getAutoReply = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("deposit")) return CASHORA_RESPONSES.deposit;
    if (lowerMessage.includes("withdraw")) return CASHORA_RESPONSES.withdraw;
    if (lowerMessage.includes("send") || lowerMessage.includes("transfer")) return CASHORA_RESPONSES.send;
    if (lowerMessage.includes("fee")) return CASHORA_RESPONSES.fees;
    return CASHORA_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Auto-reply
    setTimeout(() => {
      const autoReply: Message = {
        id: messages.length + 2,
        text: getAutoReply(newMessage),
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-gray-500 mt-2">Get help from our support team</p>
        </div>

        <Card className="p-6 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;