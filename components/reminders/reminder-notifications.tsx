"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useReminders } from "@/hooks/use-reminders";
import { formatDistanceToNow } from "date-fns";

export function ReminderNotifications() {
  const { reminders, toggleReminder } = useReminders();
  const [dismissedReminders, setDismissedReminders] = useState<string[]>([]);

  const overdueReminders = reminders.filter(
    (reminder) =>
      !reminder.completed &&
      new Date(reminder.due_date) < new Date() &&
      !dismissedReminders.includes(reminder.id)
  );

  const upcomingReminders = reminders.filter(
    (reminder) =>
      !reminder.completed &&
      new Date(reminder.due_date) > new Date() &&
      new Date(reminder.due_date) <
        new Date(Date.now() + 24 * 60 * 60 * 1000) && // Next 24 hours
      !dismissedReminders.includes(reminder.id)
  );

  const handleDismiss = (reminderId: string) => {
    setDismissedReminders((prev) => [...prev, reminderId]);
  };

  const handleComplete = async (reminderId: string) => {
    try {
      await toggleReminder(reminderId);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (overdueReminders.length === 0 && upcomingReminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Overdue Reminders */}
      {overdueReminders.map((reminder) => (
        <Alert key={reminder.id} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Overdue Reminder</span>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">
                {formatDistanceToNow(new Date(reminder.due_date))} ago
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleComplete(reminder.id)}
                className="h-6 w-6 p-0"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDismiss(reminder.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertTitle>
          <AlertDescription>
            <strong>{reminder.title}</strong>
            {reminder.description && (
              <div className="mt-1 text-sm">{reminder.description}</div>
            )}
          </AlertDescription>
        </Alert>
      ))}

      {/* Upcoming Reminders */}
      {upcomingReminders.map((reminder) => (
        <Alert key={reminder.id}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Upcoming Reminder</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {formatDistanceToNow(new Date(reminder.due_date), {
                  addSuffix: true,
                })}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleComplete(reminder.id)}
                className="h-6 w-6 p-0"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDismiss(reminder.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertTitle>
          <AlertDescription>
            <strong>{reminder.title}</strong>
            {reminder.description && (
              <div className="mt-1 text-sm">{reminder.description}</div>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
