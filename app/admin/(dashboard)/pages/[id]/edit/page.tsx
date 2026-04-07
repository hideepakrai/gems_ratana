"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageEditor } from "@/components/admin/cms/PageEditor";
import { toast } from "sonner";
import { Page } from "@/lib/store/pages/pageType";
import { updatePageThunk } from "@/lib/store/pages/pageThunk";
import { useAppDispatch } from "@/lib/store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setCurrentPages } from "@/lib/store/pages/pagesSlice";

export default function EditPage() {
  const { id } = useParams();
  const {
    allPages,
    currentPages: page,
    isLoading: loading,
  } = useSelector((state: RootState) => state.pages);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && page && allPages.length > 0) {
      const page = allPages.find((page) => page._id === id);
      if (page) {
        dispatch(setCurrentPages(page));
      }
    }
  }, [id, page, allPages]);

  const handleUpdate = async (pageData: Page) => {
    setSaving(true);
    const toastId = toast.loading("Updating page...");

    try {
      const resultAction = await dispatch(
        updatePageThunk({ id: id as string, pageData }),
      );
      if (updatePageThunk.fulfilled.match(resultAction)) {
        toast.success("Page updated successfully", { id: toastId });
        router.push("/admin/pages");
      } else {
        toast.error(
          `Update failed: ${resultAction.payload || "Unknown error"}`,
          { id: toastId },
        );
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Fetching Page Content...
        </p>
      </div>
    );
  }

  if (!page) return null;

  return (
    <div className="container mx-auto py-10">
      <PageEditor initialData={page} onSave={handleUpdate} isLoading={saving} />
    </div>
  );
}
