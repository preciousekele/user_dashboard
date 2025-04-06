import { CheckCircle, ClipboardList, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CasesOverviewChart from "../components/overview/CasesOverviewChart";
import CasesDistributionChart from "../components/overview/CasesDistributionChart";
import CasesChart from "../components/overview/CasesChart";

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Cases' Icon={ClipboardList} value='145' color='#6366F1' />
					<StatCard name='Resolved Cases' Icon={CheckCircle} value='104' color='#10B981' />
					<StatCard name='Pending Cases' Icon={Clock} value='41' color='#FF0000' />
					<StatCard name='Cases Rate' Icon={TrendingUp} value='12.5%' color='#8B5CF6' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<CasesOverviewChart />
					<CasesDistributionChart />
					<CasesChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;