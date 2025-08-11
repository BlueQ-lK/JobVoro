import { CheckCircle, Clock, Calendar, Award } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { format, formatDistanceToNow } from "date-fns";

const statusIcons = {
  Applied: Clock,
  Interview: Calendar,
  Offer: Award,
  Rejected: Clock,
  Waiting: Clock,
};

interface JobTimelineProps {
  job_id: string;
}

export function JobTimeLineView({ job_id }: JobTimelineProps) {
  const { jobs, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Timeline</h1>
          <p className="text-muted-foreground">
            Loading your application timeline...
          </p>
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Filter jobs to only include the job with the matching job_id
  const sortedJobs = jobs
    .filter((job) => job.id === job_id)
    .sort(
      (a, b) =>
        new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
    );

  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No applications to show
          </h3>
          <p className="text-muted-foreground mb-4">
            Start adding job applications to see your progress timeline.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedJobs.map((job) => {
            const StatusIcon = statusIcons[job.status];
            const isCompleted = job.status === "Offer";
            const isRejected = job.status === "Rejected";

            return (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                <div className="space-y-6">
                  {/* Application Event */}
                  <div className="relative flex items-center">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-muted border-border">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Applied</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(job.applied_date), "MMM d, yyyy")}{" "}
                            •{" "}
                            {formatDistanceToNow(new Date(job.applied_date), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Status Event (if not just Applied) */}
                  {job.status !== "Applied" && (
                    <div className="relative flex items-center">
                      <div
                        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "bg-green-500 border-green-500"
                            : isRejected
                            ? "bg-red-500 border-red-500"
                            : "bg-primary border-primary"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : isRejected ? (
                          <StatusIcon className="h-4 w-4 text-white" />
                        ) : (
                          <StatusIcon className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{job.status}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(job.updated_at), "MMM d, yyyy")}{" "}
                              •{" "}
                              {formatDistanceToNow(new Date(job.updated_at), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
