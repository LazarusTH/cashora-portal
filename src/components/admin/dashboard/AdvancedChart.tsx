import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", deposits: 4000, withdrawals: 2400, sends: 2400 },
  { name: "Feb", deposits: 3000, withdrawals: 1398, sends: 2210 },
  { name: "Mar", deposits: 2000, withdrawals: 9800, sends: 2290 },
  { name: "Apr", deposits: 2780, withdrawals: 3908, sends: 2000 },
  { name: "May", deposits: 1890, withdrawals: 4800, sends: 2181 },
  { name: "Jun", deposits: 2390, withdrawals: 3800, sends: 2500 },
  { name: "Jul", deposits: 3490, withdrawals: 4300, sends: 2100 },
];

const chartTypes = ["area", "line"] as const;

export const AdvancedChart = () => {
  const [activeChart, setActiveChart] = useState<typeof chartTypes[number]>("area");

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Transaction Overview</h3>
        <div className="flex gap-2">
          {chartTypes.map((type) => (
            <Button
              key={type}
              variant={activeChart === type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="deposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="withdrawals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="sends" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="deposits"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#deposits)"
              />
              <Area
                type="monotone"
                dataKey="withdrawals"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#withdrawals)"
              />
              <Area
                type="monotone"
                dataKey="sends"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#sends)"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="deposits"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
              <Line
                type="monotone"
                dataKey="withdrawals"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: '#EF4444' }}
              />
              <Line
                type="monotone"
                dataKey="sends"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};