import { Inbox } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function InboxView() {
  return (
    <>
      <Sheet>
        <SheetTrigger className="fixed bottom-6 right-6 w-12 h-12 bg-primary-maincolorlight rounded-full flex items-center justify-center">
          <Inbox className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
