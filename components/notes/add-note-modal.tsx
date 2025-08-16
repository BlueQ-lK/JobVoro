import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useJobs } from "@/hooks/use-jobs";
import { useState, useRef, useEffect } from "react";
import { NotepadText, Type, FileText } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (noteData: any) => Promise<void>;
  initialNoteData?: {
    title: string;
    content: string;
    job_id: string;
    id: string;
  };
}

export function AddNoteModal({
  open,
  onOpenChange,
  onSubmit,
  initialNoteData,
}: AddNoteModalProps) {
  const { jobs } = useJobs();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialNoteData?.title || "",
    content: initialNoteData?.content || "",
    job_id: initialNoteData?.job_id || "",
  });
  const isEditMode = !!initialNoteData?.job_id;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialNoteData?.id) {
      // Editing existing note
      setFormData({
        title: initialNoteData.title || "",
        content: initialNoteData.content || "",
        job_id: initialNoteData.job_id || "",
      });
    } else {
      // New note
      setFormData({
        title: "",
        content: "",
        job_id: "",
      });
    }
  }, [initialNoteData]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = contentRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.content]);

  const handleJobChange = (jobId: string) => {
    setFormData({ ...formData, job_id: jobId === "none" ? "" : jobId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const noteData = {
        title: formData.title,
        content: formData.content,
        job_id: formData.job_id || null,
      };

      await onSubmit(noteData);

      setFormData({
        title: "",
        content: "",
        job_id: "",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save note.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedJob = jobs.find((job) => job.id === formData.job_id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl p-0 flex flex-col overflow-scroll"
      >
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <NotepadText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditMode ? "Edit Note" : "New Note"}
              </h2>
              <p className="text-sm text-gray-500">
                Capture your thoughts and ideas
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Content Area */}
          <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
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

            {/* Title Input*/}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Type className="w-4 h-4" />
                <span>Title</span>
              </div>
              <input
                ref={titleRef}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Untitled"
                required
                className="w-full text-2xl font-bold px-0 py-2 border-0 ring-0 outline-none focus:outline-none focus:ring-0 focus:border-0
    placeholder:text-gray-400 placeholder:font-normal bg-transparent resize-none shadow-none"
                style={{ fontSize: "24px", lineHeight: "32px" }}
              />
            </div>

            {/* Content Area*/}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4" />
                <span>Content</span>
              </div>
              <textarea
                ref={contentRef}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Start writing your note..."
                className="w-full min-h-[200px] px-0 py-2 border-0 ring-0 outline-none focus:outline-none focus:ring-0 focus:border-0
    placeholder:text-gray-400 resize-none bg-transparent text-base leading-relaxed shadow-none"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  minHeight: "200px",
                }}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t px-6 py-4 bg-gray-50 backdrop-blur-sm sticky  bottom-0 left-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {formData.title.trim() ? (
                  <span>Ready to save</span>
                ) : (
                  <span>Title is required</span>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                  className="px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !formData.title.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : isEditMode ? (
                    "Edit Note"
                  ) : (
                    "New Note"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
