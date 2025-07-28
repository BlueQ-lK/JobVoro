"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJobs } from "@/hooks/use-jobs";
import { useReminders } from "@/hooks/use-reminders";
import { useNotes } from "@/hooks/use-notes";
import { formatDistanceToNow } from "date-fns";

export function RecentActivity() {
  const { jobs } = useJobs();
  const { reminders } = useReminders();
  const { notes } = useNotes();

  // Combine and sort all activities by date
  const activities = [
    ...jobs.map((job) => ({
      id: job.id,
      action: `Updated ${job.position} at ${job.company}`,
      status: job.status,
      time: job.updated_at,
      type: "job" as const,
    })),
    ...reminders.slice(0, 3).map((reminder) => ({
      id: reminder.id,
      action: reminder.title,
      status: reminder.completed ? "Completed" : "Pending",
      time: reminder.created_at,
      type: "reminder" as const,
    })),
    ...notes.slice(0, 2).map((note) => ({
      id: note.id,
      action: `Added note: ${note.title}`,
      status: "Note",
      time: note.created_at,
      type: "note" as const,
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest job application updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activity. Start by adding your first job application!
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={`${activity.type}-${activity.id}`}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.time), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <Badge variant="secondary">{activity.status}</Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
