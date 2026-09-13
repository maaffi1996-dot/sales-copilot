import Sidebar from "@/components/dashboard/Sidebar";
import AskBar from "@/components/dashboard/AskBar";
import KpiCards from "@/components/dashboard/KpiCards";
import TrendChart from "@/components/dashboard/TrendChart";
import BranchChart from "@/components/dashboard/BranchChart";
import InsightsFeed from "@/components/dashboard/InsightsFeed";
import PerformanceTable from "@/components/dashboard/PerformanceTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-bgWash">
      <Sidebar />
      <main className="flex-1 p-[26px_32px_60px] max-w-[1180px]">
        <AskBar />
        <KpiCards />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-7">
          <TrendChart />
          <BranchChart />
        </div>
        <InsightsFeed />
        <PerformanceTable />
      </main>
    </div>
  );
}
