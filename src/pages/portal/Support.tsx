import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const CASHORA_RESPONSES = {
  default: "Hello! I'm here to help you with any questions about Cashora's services. You can ask about deposits, withdrawals, sending money, or our fees.",
  deposit: "To make a deposit, go to the Deposit section in your dashboard. We accept various payment methods and process deposits within 24 hours.",
  withdraw: "For withdrawals, please ensure your bank details are verified. Withdrawals are typically processed within 1-2 business days.",
  send: "You can instantly send money to other Cashora users. Just enter their email or username in the Send Money section.",
  fees: "Cashora charges 0% fees for deposits and transfers between Cashora users. Withdrawal fees vary by bank and country.",
  balance: "Your balance is always secure with Cashora. You can view your current balance and transaction history in the Dashboard.",
  security: "We take security seriously. Cashora uses bank-level encryption to protect your transactions and personal information.",
  support: "Our support team is available 24/7. For urgent matters, you can also email us at support@cashora.com",
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
    if (lowerMessage.includes("balance")) return CASHORA_RESPONSES.balance;
    if (lowerMessage.includes("secure") || lowerMessage.includes("security")) return CASHORA_RESPONSES.security;
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) return CASHORA_RESPONSES.support;
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-gray-500 mt-2">Get instant help with your questions</p>
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
                  <span className="text-xs opacity-70 mt-1 block">
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
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;