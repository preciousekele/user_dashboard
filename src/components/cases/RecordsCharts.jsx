import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Legend
  } from "recharts";
  
  const COLORS = ["#10B981", "#EF4444", "#8B5CF6", "#F59E0B"];
  
  const RecordsCharts = ({ stats }) => {
    const statusData = [
      { name: "Resolved", value: stats.resolvedCount },
      { name: "Pending", value: stats.pendingCount },
      {
        name: "Other",
        value: stats.totalRecords - stats.resolvedCount - stats.pendingCount
      }
    ];
  
    const offenseData = Object.entries(stats.offenses || {}).map(([name, value]) => ({
      name,
      value
    }));
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-white">
        {/* Status Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  
        {/* Offense Bar Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Offense Frequency</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={offenseData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default RecordsCharts;
  