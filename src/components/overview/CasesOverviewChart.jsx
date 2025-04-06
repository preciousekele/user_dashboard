import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
const casesData = [
  { name: "Jul", cases: 12 },
  { name: "Aug", cases: 14 },
  { name: "Sep", cases: 15 },
  { name: "Oct", cases: 12 },
  { name: "Nov", cases: 10 },
  { name: "Dec", cases: 23 },
  { name: "Jan", cases: 22 },
  { name: "Feb", cases: 12 },
  { name: "Mar", cases: 10 },
  { name: "Apr", cases: 22 },
  { name: "May", cases: 30 },
  { name: "Jun", cases: 10 },
];

import React from "react";

const CasesOverviewChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Monthly Cases Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={casesData}>
            <CartesianGrid strokeDasharray="3 3]" stroke="#4B5563" />
            <XAxis dataKey={"name"} stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CasesOverviewChart;
