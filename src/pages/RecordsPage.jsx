import {
  CheckCircle,
  ClipboardList,
  Clock,
  FilePlus2,
  TrendingUp,
} from "lucide-react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { Link } from "react-router-dom";
import RecordsTable from "../components/cases/RecordTable";
const RecordsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Cases Record" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8  xl:px-20">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Cases"
            Icon={ClipboardList}
            value="145"
            color="#6366F1"
          />
          <StatCard
            name="Resolved Cases"
            Icon={CheckCircle}
            value="104"
            color="#10B981"
          />
          <StatCard
            name="Pending Cases"
            Icon={Clock}
            value="41"
            color="#FF0000"
          />
          <StatCard
            name="Cases Rate"
            Icon={TrendingUp}
            value="12.5%"
            color="#8B5CF6"
          />
          
        </motion.div>
        <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1 }}
        >
        <div className="flex justify-end mb-6">
          <Link
            to="/add-record"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
          >
            <FilePlus2 className="h-4 w-4" />
            Add Record
          </Link>
        </div>
        </motion.div>
        <RecordsTable />
        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="col-span-1 lg:col-span-2">
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordsPage;
