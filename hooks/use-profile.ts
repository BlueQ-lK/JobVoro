import { useEffect, useState } from "react";
import { supabase , type Profile} from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast"

export function useProfile() {
    const [profile, setProfile] = useState<Profile>()
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth();
    const { toast } = useToast()

    const fetchJobs = async () => {
        if(!user) return

        try {
            const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

            if(error) throw error
            setProfile(data || {})
        } catch (error) {
            console.error("Error fetching jobs:", error)
            toast({
                title: "Error fetching profile",
                description: "Please try again later.",
                variant: "destructive",
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [user])

    return {
        profile, 
        isLoading, 
        refetch: fetchJobs
    }
}