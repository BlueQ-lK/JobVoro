import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Menu
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Link href={item.url}>
                {item.icon && <item.icon className={cn("h-4 w-4 shrink-0")} />}
                <span className="truncate">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
