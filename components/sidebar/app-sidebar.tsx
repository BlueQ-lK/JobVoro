"use client";
import * as React from "react";
import {
  Calendar,
  StickyNote,
  Bell,
  Briefcase,
  LayoutDashboard,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switecher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "../auth-provider";
import { useProfile } from "@/hooks/use-profile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useProfile();
  const { user } = useAuth();
  const data = {
    user: {
      name: profile?.full_name || "User",
      email: user?.email || "user@gmail.com",
      avatar: "/avater/avater.png",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Job Tracker",
        url: "/tracker",
        icon: Briefcase,
      },
      {
        title: "Reminders",
        url: "/reminders",
        icon: Bell,
      },
      {
        title: "Notes",
        url: "/notes",
        icon: StickyNote,
      },
      {
        title: "Timeline",
        url: "/timeline",
        icon: Calendar,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userDetail={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
