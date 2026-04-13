"use client";

import React, { useEffect, useState } from "react";
import { PageEditor } from "@/components/admin/cms/PageEditor";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Page } from "@/lib/store/pages/pageType";
import { createPageThunk } from "@/lib/store/pages/pageThunk";
import { useAppDispatch } from "@/lib/store/hooks";
import { createPageDraft } from "@/lib/store/pages/pageHelpers";

export default function NewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const slugParam = searchParams.get("slug");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<Page>(createPageDraft());

  useEffect(() => {
    const nextDraft = createPageDraft();
    setDraft({
      ...nextDraft,
      slug: slugParam || nextDraft.slug,
    });
  }, [slugParam]);

  const handleSave = async (pageData: Page) => {
    setLoading(true);
    const toastId = toast.loading("Creating page...");

    try {
      const resultAction = await dispatch(createPageThunk(pageData));
      if (createPageThunk.fulfilled.match(resultAction)) {
        toast.success("Page created successfully", { id: toastId });
        router.push("/admin/pages");
      } else {
        toast.error(
          `Failed to create page: ${resultAction.payload || "Unknown error"}`,
          { id: toastId },
        );
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <PageEditor initialData={draft} onSave={handleSave} isLoading={loading} />
    </div>
  );
}
