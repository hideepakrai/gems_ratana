"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageContentRenderer from "@/components/pages/PageContentRenderer";
import { Sparkles, Loader2, Eye } from "lucide-react";

export default function PreviewPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from localStorage first for "live" unsaved preview
    const localDraft = localStorage.getItem(`preview_draft_${slug}`);
    if (localDraft) {
      try {
        setPage(JSON.parse(localDraft));
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse local draft");
      }
    }

    // Fallback to fetching from API if local storage is empty
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/pages/${slug}?draft=true`);
        const data = await res.json();
        if (data.success) {
          setPage(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch draft");
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Decrypting Preview Vault...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <Sparkles size={48} className="text-white/10 mb-6" />
        <h1 className="text-2xl font-bold mb-2">No Preview Available</h1>
        <p className="text-white/40 text-sm">Please return to the editor and try again.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Preview Mode Banner */}
      <div className="fixed top-0 inset-x-0 z-[9999] pointer-events-none">
        <div className="flex justify-center pt-6">
          <div className="bg-amber-500/90 backdrop-blur-md text-black px-8 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/20">
            <Eye size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Previewing Unsaved Changes</span>
            <div className="h-1.5 w-1.5 rounded-full bg-black animate-pulse ml-2" />
          </div>
        </div>
      </div>

      <PageContentRenderer page={page} />
      
      <div className="fixed bottom-8 right-8 z-[9999]">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40">GemsRatna CMS</p>
          <p className="text-xs font-bold text-white mt-1">Staging Environment</p>
        </div>
      </div>
    </div>
  );
}
