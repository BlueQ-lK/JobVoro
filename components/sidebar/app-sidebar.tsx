"use client";

import { ComponentProps } from "react";
import {
  StickyNote,
  Bell,
  Briefcase,
  LayoutDashboard,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "../auth-provider";
import { useProfile } from "@/hooks/use-profile";
import Image from "next/image";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { profile } = useProfile();
  const { user } = useAuth();
  const { state } = useSidebar();
  const data = {
    user: {
      name: profile?.full_name || "User",
      email: user?.email || "user@gmail.com",
      avatar: "/avater/avater.webp",
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
      // {
      //   title: "Settings",
      //   url: "/settings",
      //   icon: Settings,
      // },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} className="bg-background">
      <SidebarHeader>
        {state === "expanded" ? (
          <div className="flex items-center">
            <div className="w-14 shrink-0">
              <Image
                src="jobvoro.avif"
                alt="logo"
                width={56}
                height={56}
                priority
              />
            </div>
            <div className="text-primary-maincolordark font-bold text-2xl">
              Job<span className="text-primary-secondcolordark">V</span>oro
            </div>
          </div>
        ) : (
          <div className="w-9 shrink-0 transition-all">
            <Image
              src="jobvoro.avif"
              alt="logo"
              width={36}
              height={36}
              priority
            />
          </div>
        )}
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
