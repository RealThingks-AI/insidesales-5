import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { LeadTable } from "@/components/LeadTable";
import { SalesPipeline } from "@/components/SalesPipeline";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Users, DollarSign, TrendingUp, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your sales performance and manage your pipeline.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Leads"
              value="284"
              change="+12% from last month"
              changeType="positive"
              icon={Users}
            />
            <MetricCard
              title="Revenue"
              value="$127,450"
              change="+8.2% from last month"
              changeType="positive"
              icon={DollarSign}
            />
            <MetricCard
              title="Conversion Rate"
              value="24.5%"
              change="+2.4% from last month"
              changeType="positive"
              icon={TrendingUp}
            />
            <MetricCard
              title="Deals Won"
              value="38"
              change="On track for quota"
              changeType="neutral"
              icon={Target}
            />
          </div>

          {/* Pipeline Section */}
          <SalesPipeline />

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Leads</h2>
                <button className="text-sm text-primary hover:underline font-medium">
                  View all
                </button>
              </div>
              <LeadTable />
            </div>
            <div className="space-y-4">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
