import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaUploader } from "./MediaManage";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MediaLibraryModalProps {
  onSelect: (media: { url: string; alt: string }) => void;
  trigger?: React.ReactNode;
}

export const MediaLibraryModal = ({
  onSelect,
  trigger,
}: MediaLibraryModalProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (media: any) => {
    onSelect({
      url: media.url,
      alt: media.alt || "",
    });
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger || (
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-white/10 bg-white/5 text-amber-200 hover:bg-white/10 hover:text-amber-400 transition-all"
          >
            <ImageIcon size={18} />
          </Button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!h-[90vh] !max-w-[95vw] w-[95vw] !p-0 overflow-hidden border-white/10 bg-[#0a0a0a] shadow-2xl [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Media Library</DialogTitle>
          </VisuallyHidden>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Media Library
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/50 pt-1">
                  Select or upload brand assets
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-xl h-10 w-10 text-white/40 hover:text-white hover:bg-white/5"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <MediaUploader onSelect={handleSelect} hideHeader={true} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
