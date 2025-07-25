"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  Calendar,
  Briefcase,
  Menu,
  Eclipse,
  EllipsisVertical,
} from "lucide-react";
import { useNotes } from "@/hooks/use-notes";
import { formatDistanceToNow } from "date-fns";
import { AddNoteModal } from "./add-note-modal";

export function NotesView() {
  const { notes, isLoading, addNote, updateNote, refetch } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    job_id: "",
    id: "",
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const handleAddNote = async (noteData: any) => {
    try {
      if (note.id) {
        await updateNote(note.id, noteData);
      } else {
        await addNote(noteData);
      }
      await refetch();
      setIsAddModalOpen(false);
      setNote({ title: "", content: "", job_id: "", id: "" });
    } catch (error) {
      console.log("error saving note {notes-view.tsx L:66}");
    }
  };

  const handleNewNote = () => {
    setNote({
      title: "",
      content: "",
      job_id: "",
      id: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEditNote = (openNoteId: string) => {
    filteredNotes.map((item) => {
      if (item.id == openNoteId) {
        setNote({
          title: item.title || "",
          content: item.content || "",
          job_id: item.job_id || "",
          id: item.id || "",
        });
      }
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground">
            {notes.length === 0
              ? "Keep track of important information and insights"
              : `${notes.length} note${notes.length === 1 ? "" : "s"} saved`}
          </p>
        </div>
        <Button onClick={handleNewNote}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {notes.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
          <p className="text-muted-foreground mb-4">
            Start taking notes about companies, interviews, and your job search
            strategy.
          </p>
          <Button onClick={handleNewNote}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Note
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleEditNote(note.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    {note.jobs && (
                      <CardDescription className="mt-1 flex items-baseline">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {note.jobs.company}
                      </CardDescription>
                    )}
                  </div>
                  <EllipsisVertical
                    className="h-5 w-5 bg-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("hello");
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>
              </CardContent>
              <CardFooter className="">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDistanceToNow(new Date(note.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <AddNoteModal
        key={note.id || "new"}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddNote}
        initialNoteData={note}
      />
    </div>
  );
}
