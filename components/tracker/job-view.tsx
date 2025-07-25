"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Edit3,
  Trash2,
  RefreshCw,
  ChevronRight,
  Building2,
  CheckCircle,
  Circle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { JobTimeLineView } from "./job-timeline";
import { format } from "date-fns";
import { JobRemainderView } from "./job-remainder-view";
import { useJobs } from "@/hooks/use-jobs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

interface JobViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClick: (jobData: any) => Promise<void>;
  jobId: string;
}

const statusOptions = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Waiting",
] as const;

export function JobViewAll({
  open,
  onOpenChange,
  onClick,
  jobId,
}: JobViewProps) {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interview: "bg-purple-100 text-purple-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Waiting: "bg-gray-100 text-gray-800",
  };
  const [status, setStatus] = useState("upcoming");
  const { jobs, updateJob, deleteJob } = useJobs();
  const [isEdit, setIsEdit] = useState(false);

  const currentJob = jobs.find((j) => j.id === jobId);
  const [editData, setEditData] = useState({
    position: currentJob?.position || "",
    company: currentJob?.company || "",
    location: currentJob?.location || "",
    applied_date: currentJob?.applied_date || "",
    job_url: currentJob?.job_url || "",
  });

  useEffect(() => {
    if (currentJob) {
      setEditData({
        position: currentJob.position,
        company: currentJob.company,
        location: currentJob.location || "",
        applied_date: currentJob.applied_date,
        job_url: currentJob.job_url || "",
      });
    }
  }, [currentJob]);

  const handleFieldChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!currentJob) return;
    await updateJob(currentJob.id, editData);
    onClick("deleted");
    setIsEdit(false);
  };

  const handleDeleteJob = async () => {
    if (!currentJob) return;
    try {
      await deleteJob(currentJob.id);
      onClick("deleted");
      onOpenChange(false);
    } catch {
      // Error handled in hook
    }
  };

  if (!currentJob) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) setIsEdit(false);
        onOpenChange(open);
      }}
    >
      <SheetContent className="w-full sm:min-w-[600px] overflow-y-auto px-10">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? (
              <input
                type="text"
                className="px-2 py-1 mb-3 focus:border-none focus:outline-none border-b-2 w-full"
                value={editData.position}
                onChange={(e) => handleFieldChange("position", e.target.value)}
              />
            ) : (
              <h1 className="text-2xl font-bold mb-1">{currentJob.position}</h1>
            )}
            <div className="flex items-center">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 ml-1 mr-1" />
                {isEdit ? (
                  <input
                    type="text"
                    className="mr-2 px-2 py-1 focus:border-none focus:outline-none border-b-2 w-full text-sm"
                    value={editData.company}
                    onChange={(e) =>
                      handleFieldChange("company", e.target.value)
                    }
                  />
                ) : (
                  <span className="text-sm font-normal text-muted-foreground">
                    {currentJob.company}
                  </span>
                )}
                <span
                  className={`px-3 py-1 ml-3 rounded-full text-sm font-medium ${
                    statusColors[currentJob.status as keyof typeof statusColors]
                  }`}
                >
                  {currentJob.status}
                </span>
              </div>
            </div>
          </SheetTitle>
          <div>
            <div className="border-b">
              <div className="py-4 flex gap-2">
                <Button
                  size="sm"
                  className="bg-transparent text-muted-foreground border-2 hover:bg-muted"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <Edit3 className="w-4 h-4" />
                  {isEdit ? "Cancel" : "Edit"}
                </Button>
                {isEdit && (
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger className="text-red-700  border-red-200 border-2 hover:bg-red-50 rounded-md px-3 flex items-center gap-1 text-sm">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your job data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteJob()}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="py-6 space-y-6">
              {/* Job Information */}
              <Card className="border-none">
                <h2 className="text-lg font-semibold mb-4">Job Information</h2>
                <div
                  className={`flex items-center ml-4 ${
                    isEdit ? "gap-0" : "gap-28"
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        {isEdit ? (
                          <input
                            type="text"
                            className="px-2 py-1 focus:border-none focus:outline-none border-b-2 text-sm"
                            value={editData.location}
                            onChange={(e) =>
                              handleFieldChange("location", e.target.value)
                            }
                          />
                        ) : (
                          <p className="font-medium">
                            {currentJob.location || "N/A"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <Clock className="w-4 h-4 " />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        {isEdit ? (
                          <p>full time</p>
                        ) : (
                          <p className="font-medium">{"Full-time"}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Applied Date
                        </p>
                        {isEdit ? (
                          <input
                            type="date"
                            className="px-2 py-1 focus:border-none focus:outline-none border-b-2 text-sm"
                            value={editData.applied_date.slice(0, 10)}
                            onChange={(e) =>
                              handleFieldChange("applied_date", e.target.value)
                            }
                          />
                        ) : (
                          <p className="font-medium">
                            {format(
                              new Date(currentJob.applied_date),
                              "MMM d, yyyy"
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Job URL</p>
                        {isEdit ? (
                          <input
                            type="text"
                            value={editData.job_url}
                            className="px-2 py-1 focus:border-none focus:outline-none border-b-2 text-sm"
                            onChange={(e) =>
                              handleFieldChange("job_url", e.target.value)
                            }
                          />
                        ) : currentJob.job_url ? (
                          <a
                            href={currentJob.job_url}
                            className="font-medium text-blue-600 hover:text-blue-700 transition-colors text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Job Posting
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Job Description */}
              <Card className="py-5 border-none">
                <h2 className="text-lg font-semibold  mb-3">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  autem laboriosam adipisci, voluptate ea consequatur!
                  Exercitationem laborum ullam magni veniam? A eveniet
                  temporibus harum at ratione fuga, adipisci aliquid
                  voluptatibus.
                </p>
              </Card>

              {/* Timeline */}
              <Card className="border-none pb-4">
                <h2 className="text-lg font-semibold  mb-4">
                  Application Timeline
                </h2>
                <div className="space-y-3">
                  <JobTimeLineView job_id={jobId} />
                </div>
              </Card>

              {/* Reminders */}
              <Card className="py-5 border-none">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold  mb-1">Reminders</h2>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setStatus("upcoming")}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        status === "upcoming"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Upcoming
                    </button>
                    <button
                      onClick={() => setStatus("completed")}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        status === "completed"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <JobRemainderView job_id={jobId} status={status} />
                </div>
              </Card>

              {/* Notes */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h2 className="text-lg font-semibold  mb-3">Notes</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-gray-100">
                    <p className=" leading-relaxed text-sm">
                      Talked to HR on June 29th — expecting tech round this
                      week. The team seems very collaborative and the role has
                      good growth potential.
                    </p>
                    <p className="text-xs  mt-2">Added 2 days ago</p>
                  </div>

                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-600 transition-colors text-sm">
                    + Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
