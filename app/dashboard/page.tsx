import { DashboardLayout } from "@/components/dashboard/layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ReminderNotifications } from "@/components/reminders/reminder-notifications";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ReminderNotifications />

        <SummaryCards />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
