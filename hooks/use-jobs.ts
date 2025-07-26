"use client"

import { useState, useEffect } from "react"
import { supabase, type Job } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchJobs = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast({
        title: "Error fetching jobs",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addJob = async (jobData: Omit<Job, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) return

    try {
      const jobDataFilter = {
        company: jobData.company,
        position: jobData.position,
        location: jobData.location,
        salary: jobData.salary,
        status: jobData.status,
        job_url: jobData.job_url,
        applied_date: jobData.applied_date,
      }

      const noteDataFilter = {
        title: jobData.title,
        content: jobData.content
      }

      const { data, error } = await supabase
        .from("jobs")
        .insert([{ ...jobDataFilter, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      if(noteDataFilter.title || noteDataFilter.content) {
        if(noteDataFilter.title) {
          noteDataFilter.title = "New Note"
        }
        const {error: noteError} = await supabase
        .from("notes")
        .insert({
          title: noteDataFilter.title,
          content: noteDataFilter.content,
          job_id: data.id,
          user_id: data.user_id
        })
        if(noteError) throw error
      }



      setJobs((prev) => [data, ...prev])
      toast({
        title: "Job added successfully!",
        description: `${jobData.position} at ${jobData.company} has been added.`,
      })
      return data
    } catch (error) {
      console.error("Error adding job:", error)
      toast({
        title: "Error adding job",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateJob = async (id: string, updates: Partial<Job>) => {
    try {
      const { data, error } = await supabase.from("jobs").update(updates).eq("id", id).select().single()

      if (error) throw error

      setJobs((prev) => prev.map((job) => (job.id === id ? data : job)))
      toast({
        title: "Job updated successfully!",
      })
      return data
    } catch (error) {
      console.error("Error updating job:", error)
      toast({
        title: "Error updating job",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id)

      if (error) throw error

      setJobs((prev) => prev.filter((job) => job.id !== id))
      toast({
        title: "Job deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting job:", error)
      toast({
        title: "Error deleting job",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [user])

  return {
    jobs,
    isLoading,
    addJob,
    updateJob,
    deleteJob,
    refetch: fetchJobs,
  }
}
