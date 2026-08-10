"use client";

import { useState } from "react";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { personal } from "@/data/resumeData";

interface DownloadPdfButtonProps {
  variant?: "primary" | "ghost" | "invert";
}

const VARIANT_CLASS: Record<NonNullable<DownloadPdfButtonProps["variant"]>, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-70 bg-accent text-accent-fg hover:opacity-90",
  ghost:
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-70 border border-border text-fg hover:border-accent",
  invert:
    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border border-black bg-transparent px-4 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white disabled:opacity-70",
};

export function DownloadPdfButton({ variant = "primary" }: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const [{ pdf }, { ResumePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./pdf/resume-pdf"),
      ]);

      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${personal.name.replace(/\s+/g, "-")}-Curriculo.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className={VARIANT_CLASS[variant]}
    >
      {loading ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Gerando PDF
        </>
      ) : variant === "invert" ? (
        <>
          <Download size={15} />
          Baixar currículo (PDF) ↗
        </>
      ) : (
        <>
          <Download size={15} />
          Baixar currículo
          {variant === "primary" && <ArrowRight size={15} />}
        </>
      )}
    </button>
  );
}
