"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  IndianRupee,
  ExternalLink,
  Bell,
  Trash2,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useReminders } from "@/hooks/use-reminders";
import { formatDistanceToNow } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job } from "@/lib/supabase";
import { AddJobModal } from "./add-job-modal";
import { AddReminderModal } from "../reminders/add-reminder-modal";
import { Briefcase } from "lucide-react";
import { JobViewAll } from "./job-view";

const statusOptions = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Waiting",
] as const;

export function JobTracker() {
  const { jobs, isLoading, addJob, deleteJob, updateJob, refetch } = useJobs();
  const { addReminder } = useReminders();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [reminderJobId, setReminderJobId] = useState<string | null>(null);
  const [mouseDownPos, setMouseDownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(job.status);
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = async (jobData: any) => {
    await addJob(jobData);
    setIsAddModalOpen(false);
  };

  const handleUpdateJob = async () => {
    await refetch();
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: React.MouseEvent, job: Job) => {
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (["button", "input", "svg", "path"].includes(tag)) return;

    if (mouseDownPos) {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);
      if (dx > 5 || dy > 5) return;
    }

    setSelectedJob(job);
    setIsSheetOpen(true);
  };

  const handleReminderSubmit = async (data: any) => {
    if (!reminderJobId) return;
    await addReminder({ ...data, job_id: reminderJobId });
    setReminderJobId(null);
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteJob(jobId);
    await refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Job Tracker</h1>
        <p className="text-muted-foreground">
          Loading your job applications...
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <p className="text-muted-foreground">
            {jobs.length === 0
              ? "Start tracking your job applications"
              : `Managing ${jobs.length} job application${
                  jobs.length === 1 ? "" : "s"
                }`}
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      {jobs.length > 0 && (
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setFilterValue(!filterValue)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={refetch}>Refresh</Button>
        </div>
      )}

      {filterValue && (
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xl">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-x-2">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={
                  selectedStatus.includes(status) ? "default" : "outline"
                }
                onClick={() => toggleStatus(status)}
              >
                {status}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No job applications yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Start tracking your job applications to stay organized.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="cursor-pointer flex flex-col"
              onMouseDown={handleMouseDown}
              onClick={(e) => handleClick(e, job)}
            >
              <Card className="hover:shadow-xl transition-shadow shadow-md h-full relative">
                <CardHeader>
                  <div className="flex justify-between items-baseline">
                    <div className="flex-1">
                      <CardTitle className="text-lg inline-flex gap-2">
                        {job.company}
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
                      <p className="text-sm text-muted-foreground">
                        {job.position}
                      </p>
                    </div>
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
                      value={job.status}
                      onValueChange={(value) =>
                        updateJob(job.id, {
                          status: value as Job["status"],
                        }).then(() => refetch())
                      }
                    >
                      <SelectTrigger onClick={(e) => e.stopPropagation()}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReminderJobId(job.id);
                      }}
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(job.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <AddJobModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddJob}
      />
      {selectedJob && (
        <JobViewAll
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          onClick={handleUpdateJob}
          jobId={selectedJob.id}
        />
      )}
      <AddReminderModal
        open={Boolean(reminderJobId)}
        onOpenChange={() => setReminderJobId(null)}
        onSubmit={handleReminderSubmit}
        preselectedJobId={reminderJobId ?? ""}
      />
    </div>
  );
}
