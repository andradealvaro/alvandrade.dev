"use client";

import { useState } from "react";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { personal } from "@/data/resumeData";

interface DownloadPdfButtonProps {
  variant?: "primary" | "ghost";
}

export function DownloadPdfButton({ variant = "primary" }: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);

  const baseClass =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-70";
  const variantClass =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-border text-fg hover:border-accent";

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
      className={`${baseClass} ${variantClass}`}
    >
      {loading ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Gerando PDF
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
