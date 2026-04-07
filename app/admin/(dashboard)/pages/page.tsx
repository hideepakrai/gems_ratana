"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchPagesThunk, deletePageThunk } from "@/lib/store/pages/pageThunk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  FileText,
  Loader2,
  Archive,
} from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Page } from "@/lib/store/pages/pageType";
import { cn } from "@/lib/utils";
import { setCurrentPages } from "@/lib/store/pages/pagesSlice";

function PagesPageContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { allPages: pages, isLoading: loading } = useSelector(
    (state: RootState) => state.pages,
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the page "${title}"?`))
      return;

    setDeletingId(id);
    const toastId = toast.loading(`Deleting ${title}...`);

    try {
      const resultAction = await dispatch(deletePageThunk(id));
      if (deletePageThunk.fulfilled.match(resultAction)) {
        toast.success(`${title} deleted successfully`, { id: toastId });
      } else {
        toast.error(
          `Delete failed: ${resultAction.payload || "Unknown error"}`,
          { id: toastId },
        );
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-4 sm:p-8">
      {/* ── HEADER ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary shadow-sm shadow-primary/5 transition-transform hover:scale-105">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Content <span className="text-primary/40">Engine</span>
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground opacity-60">
              CMS Pages & Narrative Structure
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/admin/pages/new")}
          className="h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 text-[10px] font-black uppercase tracking-widest px-6"
        >
          <Plus size={14} className="mr-2" /> New Page
        </Button>
      </div>

      {/* ── CONTENT MATRIX ────────────────────────────── */}
      <div className="glass-card rounded-2xl overflow-hidden border-border/40">
        <Table>
          <TableHeader className="bg-surface/50">
            <TableRow className="hover:bg-transparent border-border/20">
              <TableHead className="h-12 font-black text-muted-foreground/50 uppercase tracking-widest text-[9px] pl-6">
                Identity & Route
              </TableHead>
              <TableHead className="h-12 font-black text-muted-foreground/50 uppercase tracking-widest text-[9px]">
                Status
              </TableHead>
              <TableHead className="h-12 font-black text-muted-foreground/50 uppercase tracking-widest text-[9px]">
                Temporal Context
              </TableHead>
              <TableHead className="h-12 text-right font-black text-muted-foreground/50 uppercase tracking-widest text-[9px] pr-6">
                Operations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                      Synchronizing Content...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-30">
                    <Archive size={40} className="text-muted-foreground" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Zero Documents In Store
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page: Page) => (
                <TableRow
                  key={page._id}
                  className="hover:bg-primary/5 border-border/10 transition-colors group"
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-background/50 flex items-center justify-center text-muted-foreground group-hover:text-primary border border-border/20 transition-colors">
                        <Globe size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-none mb-1 group-hover:text-primary transition-colors">
                          {page.title}
                        </span>
                        <code className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter">
                          /{page.slug}
                        </code>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                          page.isPublished
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-surface/50 text-muted-foreground border-border/40",
                        )}
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {page.updatedAt
                          ? new Date(page.updatedAt).toLocaleDateString(
                              undefined,
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/30">
                        Last Synchronization
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => {
                          dispatch(setCurrentPages(page));
                          router.push(`/admin/pages/${page._id}/edit`);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        disabled={deletingId === page._id}
                        onClick={() =>
                          page._id && handleDelete(page._id, page.title)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function PagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
            Initializing Content Engine...
          </span>
        </div>
      }
    >
      <PagesPageContent />
    </Suspense>
  );
}
