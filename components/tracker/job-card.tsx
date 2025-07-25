"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  IndianRupee,
  FileText,
  ExternalLink,
  Bell,
} from "lucide-react";
import type { Job } from "@/lib/supabase";
import { useJobs } from "@/hooks/use-jobs";
import { formatDistanceToNow } from "date-fns";
import { AddReminderModal } from "../reminders/add-reminder-modal";
import { useReminders } from "@/hooks/use-reminders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobViewAll } from "./job-view";
import { ref } from "process";

interface JobCardProps {
  job: Job;
}

const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Waiting: "bg-gray-100 text-gray-800",
};

const statusOptions = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Waiting",
] as const;

export function JobCard({ job }: JobCardProps) {
  const { updateJob, jobs, refetch } = useJobs();
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const { addReminder } = useReminders();
  const [updateStatus, setUpdateStatus] = useState<
    (typeof statusOptions)[number] | undefined
  >(job.status);

  const handleStatusChange = async (
    newStatus: (typeof statusOptions)[number]
  ) => {
    try {
      const res = await updateJob(job.id, { status: newStatus });
      setUpdateStatus(res.status);
    } catch (error) {
      console.log("update job status error {job-card.tsx L:65}");
    }
  };

  const handleAddReminder = async (reminderData: any) => {
    try {
      await addReminder(reminderData);
      setIsReminderModalOpen(false);
    } catch (error) {
      console.log("Add job error {job-card.tsx L:74}");
    }
  };

  return (
    <Card className="hover:shadow-xl transition-shadow shadow-md h-full">
      <CardHeader>
        <div className="flex justify-between items-baseline">
          <div className="flex-1 ">
            <CardTitle className="text-lg inline-flex items-top gap-2 mr-1 space-y-1.5">
              <span className="break-words">{job.company}</span>
              {job.job_url && (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{job.position}</p>
          </div>
          <Badge
            className={
              statusColors[updateStatus ?? job.status] ||
              "bg-gray-100 text-gray-800"
            }
          >
            {updateStatus ?? job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Applied{" "}
          {formatDistanceToNow(new Date(job.applied_date), {
            addSuffix: true,
          })}
        </div>
        {job.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {job.location}
          </div>
        )}
        {job.salary && (
          <div className="flex items-center text-sm text-muted-foreground">
            <IndianRupee className="mr-2 h-4 w-4" />
            {job.salary}
          </div>
        )}
        <div className="flex space-x-2 pt-2">
          <Select
            value={updateStatus || job.status}
            onValueChange={(value) =>
              handleStatusChange(value as (typeof statusOptions)[number])
            }
          >
            <SelectTrigger onClick={(e) => e.stopPropagation()}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setIsReminderModalOpen(true);
            }}
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <AddReminderModal
        open={isReminderModalOpen}
        onOpenChange={setIsReminderModalOpen}
        onSubmit={handleAddReminder}
        preselectedJobId={job.id}
      />
    </Card>
  );
}
