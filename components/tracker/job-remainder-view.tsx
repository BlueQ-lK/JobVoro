import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar, Award, Briefcase } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { format, formatDistanceToNow } from "date-fns";
import { useReminders } from "@/hooks/use-reminders";
import { Button } from "../ui/button";

interface JobTimelineProps {
  job_id: string;
  status: string;
}

export function JobRemainderView({ job_id, status }: JobTimelineProps) {
  const { reminders, isLoading, toggleReminder } = useReminders();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reminders</h1>
            <p className="text-muted-foreground">Loading your reminders...</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  function upcomingReminders() {
    const upcoming = reminders.filter(
      (r) => !r.completed && r.job_id == job_id
    );
    if (upcoming.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center py-4">
          All caught up! No pending reminders.
        </p>
      );
    } else {
      return upcoming.map((reminder) => (
        <div
          key={reminder.id}
          className="flex items-center justify-between p-3 border-l-4 rounded-lg border"
        >
          <div className="flex-1">
            <h4 className="font-medium text-sm">{reminder.title}</h4>
            {reminder.jobs && (
              <div className="flex items-start ">
                <Briefcase className="mr-1 h-3 w-3 mt-0.5" />
                <p className="text-xs text-muted-foreground flex items-center">
                  {reminder.jobs.company}
                </p>
              </div>
            )}
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(reminder.due_date), "MMM d, yyyy")} •{" "}
              {formatDistanceToNow(new Date(reminder.due_date), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-muted ">
            <Badge variant="outline">{reminder.type}</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toggleReminder(reminder.id)}
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ));
    }
  }

  function completedReminders() {
    const completed = reminders.filter(
      (r) => r.completed && r.job_id == job_id
    );
    if (completed.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center py-4">
          No completed reminders yet.
        </p>
      );
    } else {
      return completed.slice(0, 5).map((reminder) => (
        <div
          key={reminder.id}
          className="flex items-center justify-between p-3 rounded-lg opacity-60 border border-l-4"
        >
          <div className="flex-1">
            <h4 className="font-medium line-through text-sm">
              {reminder.title}
            </h4>
            {reminder.jobs && (
              <div className="flex items-start">
                <Briefcase className="mr-1 h-3 w-3 mt-0.5" />
                <p className="text-xs text-muted-foreground flex items-center">
                  {reminder.jobs.company}
                </p>
              </div>
            )}
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(reminder.due_date), "MMM d, yyyy")}
            </div>
          </div>
          <Badge variant="secondary">Completed</Badge>
        </div>
      ));
    }
  }
  return (
    <>{status === "upcoming" ? upcomingReminders() : completedReminders()}</>
  );
}
