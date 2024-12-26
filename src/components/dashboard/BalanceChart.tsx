import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", balance: 5000 },
  { date: "Feb", balance: 7500 },
  { date: "Mar", balance: 10000 },
  { date: "Apr", balance: 8500 },
  { date: "May", balance: 12000 },
  { date: "Jun", balance: 10000 },
];

export const BalanceChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Balance Overview</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ fill: "#16a34a" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};