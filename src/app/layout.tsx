import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BootSequence } from "@/components/boot-sequence";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `alv.dev — ${personal.name}`,
  description: personal.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Runs before paint so a saved "light" preference never flashes dark first.
          // Dark is the default and needs no script — it's already the base CSS.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('resume-theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}",
          }}
        />
      </head>
      <body className="relative min-h-full flex flex-col bg-bg text-fg font-body">
        <ThemeProvider>
          <BootSequence />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
