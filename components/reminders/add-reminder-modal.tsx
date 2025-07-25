"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useJobs } from "@/hooks/use-jobs";
import { Clock } from "lucide-react";

interface AddReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reminderData: any) => Promise<void>;
  preselectedJobId?: string;
}

const reminderTypes = [
  {
    value: "Follow-up",
    label: "Follow-up",
    description: "Follow up on application status",
  },
  {
    value: "Interview Prep",
    label: "Interview Prep",
    description: "Prepare for upcoming interview",
  },
  {
    value: "Thank You",
    label: "Thank You",
    description: "Send thank you note after interview",
  },
  { value: "Other", label: "Other", description: "Custom reminder" },
];

export function AddReminderModal({
  open,
  onOpenChange,
  onSubmit,
  preselectedJobId,
}: AddReminderModalProps) {
  const { jobs } = useJobs();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    job_id: preselectedJobId || "",
    due_date: "",
    due_time: "09:00",
    type: "Follow-up" as string,
  });

  // Get current date and time for defaults
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];
  const defaultTime = "09:00";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Combine date and time into ISO string
      const dueDateTime = new Date(
        `${formData.due_date}T${formData.due_time}:00`
      );

      const reminderData = {
        title: formData.title,
        description: formData.description || null,
        job_id: formData.job_id || null,
        due_date: dueDateTime.toISOString(),
        type: formData.type,
        completed: false,
      };

      await onSubmit(reminderData);

      // Reset form
      setFormData({
        title: "",
        description: "",
        job_id: preselectedJobId || "",
        due_date: "",
        due_time: "09:00",
        type: "Follow-up",
      });
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setFormData({ ...formData, type: type as any });

    // Auto-fill title based on type and selected job
    const selectedJob = jobs.find((job) => job.id === formData.job_id);
    if (selectedJob) {
      let autoTitle = "";
      switch (type) {
        case "Follow-up":
          autoTitle = `Follow up with ${selectedJob.company}`;
          break;
        case "Interview Prep":
          autoTitle = `Prepare for ${selectedJob.company} interview`;
          break;
        case "Thank You":
          autoTitle = `Send thank you note to ${selectedJob.company}`;
          break;
        default:
          autoTitle = `${selectedJob.company} - ${selectedJob.position}`;
      }
      setFormData((prev) => ({ ...prev, title: autoTitle, type: type as any }));
    }
  };

  const handleJobChange = (jobId: string) => {
    setFormData({ ...formData, job_id: jobId });

    // Auto-fill title when job is selected
    const selectedJob = jobs.find((job) => job.id === jobId);
    if (selectedJob && !formData.title) {
      let autoTitle = "";
      switch (formData.type) {
        case "Follow-up":
          autoTitle = `Follow up with ${selectedJob.company}`;
          break;
        case "Interview Prep":
          autoTitle = `Prepare for ${selectedJob.company} interview`;
          break;
        case "Thank You":
          autoTitle = `Send thank you note to ${selectedJob.company}`;
          break;
        default:
          autoTitle = `${selectedJob.company} - ${selectedJob.position}`;
      }
      setFormData((prev) => ({ ...prev, title: autoTitle }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Add New Reminder
        </DialogTitle>
        <DialogHeader>
          <DialogDescription>
            Set a reminder to stay on top of your job applications and never
            miss important follow-ups.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reminder Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Reminder Type *</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reminderTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Selection */}
          <div className="space-y-2">
            <Label htmlFor="job_id">Related Job (Optional)</Label>
            <Select value={formData.job_id} onValueChange={handleJobChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a job application" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No specific job</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    <div>
                      <div className="font-medium">{job.company}</div>
                      <div className="text-xs text-muted-foreground">
                        {job.position}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Reminder Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Follow up with TechCorp"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date *</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date || defaultDate}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_time">Due Time</Label>
              <Input
                id="due_time"
                type="time"
                value={formData.due_time}
                onChange={(e) =>
                  setFormData({ ...formData, due_time: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add any additional details or notes for this reminder..."
              rows={3}
            />
          </div>

          {/* Quick Date Buttons */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Tomorrow", days: 1 },
                { label: "In 3 days", days: 3 },
                { label: "Next week", days: 7 },
                { label: "In 2 weeks", days: 14 },
              ].map((option) => (
                <Button
                  key={option.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + option.days);
                    setFormData({
                      ...formData,
                      due_date: date.toISOString().split("T")[0],
                    });
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Reminder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
