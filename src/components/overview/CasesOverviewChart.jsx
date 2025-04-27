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
import { useEffect, useState } from "react";

const CasesOverviewChart = ({ records }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Process records to get monthly counts
    const monthCounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize all months with 0
    months.forEach(month => {
      monthCounts[month] = 0;
    });
    
    // Count cases per month
    records.forEach(record => {
      const date = new Date(record.createdAt || record.date);
      const month = months[date.getMonth()];
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    // Convert to array format for chart
    const data = months.map(month => ({
      name: month,
      cases: monthCounts[month] || 0
    }));
    
    // Sort data by month (assuming current month order is correct)
    setMonthlyData(data);
  }, [records]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Monthly Cases Overview</h2>
      <div className="h-80">
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No data available
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CasesOverviewChart;