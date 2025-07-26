"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, CheckCircle, Briefcase } from "lucide-react";
import { useReminders } from "@/hooks/use-reminders";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";
import { AddReminderModal } from "./add-reminder-modal";
import { Job } from "@/lib/supabase";

interface Remainder {
  job: Job;
}

export function RemindersView() {
  const { reminders, isLoading, toggleReminder, addReminder } = useReminders();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddReminder = async (reminderData: any) => {
    try {
      await addReminder(reminderData);
      setIsAddModalOpen(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const upcomingReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            {reminders.length === 0
              ? "Never miss a follow-up or interview again"
              : `${upcomingReminders.length} upcoming, ${completedReminders.length} completed`}
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No reminders set</h3>
          <p className="text-muted-foreground mb-4">
            Set reminders for follow-ups, interviews, and important deadlines.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Reminder
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Upcoming Reminders
              </CardTitle>
              <CardDescription>
                {upcomingReminders.length} pending reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All caught up! No pending reminders.
                </p>
              ) : (
                upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{reminder.title}</h4>
                      {reminder.jobs && (
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          {reminder.jobs.company} - {reminder.jobs.position}
                        </p>
                      )}
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(
                          new Date(reminder.due_date),
                          "MMM d, yyyy"
                        )} •{" "}
                        {formatDistanceToNow(new Date(reminder.due_date), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
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
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Completed
              </CardTitle>
              <CardDescription>
                {completedReminders.length} completed reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedReminders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No completed reminders yet.
                </p>
              ) : (
                completedReminders.slice(0, 5).map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 border rounded-lg opacity-60"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium line-through">
                        {reminder.title}
                      </h4>
                      {reminder.jobs && (
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          {reminder.jobs.company} - {reminder.jobs.position}
                        </p>
                      )}
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(new Date(reminder.due_date), "MMM d, yyyy")}
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
      <AddReminderModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddReminder}
      />
    </div>
  );
}
