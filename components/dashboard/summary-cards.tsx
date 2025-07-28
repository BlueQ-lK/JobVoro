"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useReminders } from "@/hooks/use-reminders";

export function SummaryCards() {
  const { jobs, isLoading: jobsLoading } = useJobs();
  const { reminders, isLoading: remindersLoading } = useReminders();

  const totalJobs = jobs.length;
  const interviewJobs = jobs.filter((job) => job.status === "Interview").length;
  const offers = jobs.filter((job) => job.status === "Offer").length;
  const overdueReminders = reminders.filter(
    (reminder) =>
      !reminder.completed && new Date(reminder.due_date) < new Date()
  ).length;
  const upcomingReminders = reminders.filter(
    (reminder) =>
      !reminder.completed && new Date(reminder.due_date) >= new Date()
  ).length;

  const stats = [
    {
      title: "Total Jobs Tracked",
      value: jobsLoading ? "..." : totalJobs.toString(),
      icon: Briefcase,
      change: `${
        jobs.filter((job) => {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(job.created_at) > weekAgo;
        }).length
      } this week`,
    },
    {
      title: "Interviews Scheduled",
      value: jobsLoading ? "..." : interviewJobs.toString(),
      icon: Calendar,
      change: interviewJobs > 0 ? "Active interviews" : "No interviews yet",
    },
    {
      title: "Offers Received",
      value: jobsLoading ? "..." : offers.toString(),
      icon: CheckCircle,
      change: offers > 0 ? "Congratulations!" : "Keep applying!",
    },
    {
      title: "Follow-ups Due",
      value: remindersLoading ? "..." : upcomingReminders.toString(),
      icon: Clock,
      change:
        overdueReminders > 0 ? `${overdueReminders} overdue` : "All caught up",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
