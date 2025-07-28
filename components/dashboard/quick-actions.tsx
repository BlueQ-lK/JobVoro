import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Bell, FileText, BarChart3 } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to keep you organized</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" asChild>
          <Link href="/tracker">
            <Plus className="mr-2 h-4 w-4" />
            Add New Job
          </Link>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
          asChild
        >
          <Link href="/timeline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Timeline
          </Link>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
          asChild
        >
          <Link href="/reminders">
            <Bell className="mr-2 h-4 w-4" />
            Check Reminders
          </Link>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
          asChild
        >
          <Link href="/notes">
            <FileText className="mr-2 h-4 w-4" />
            Review Notes
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
