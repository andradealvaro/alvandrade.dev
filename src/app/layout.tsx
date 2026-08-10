import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { personal } from "@/data/resumeData";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
