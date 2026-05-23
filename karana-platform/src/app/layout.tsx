import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: { default: "KARANA — Innovation Execution Platform", template: "%s | KARANA" },
  description: "From idea to reality. CAD, Software, Hardware, and Manufacturing — all under one roof.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <SessionProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </SessionProvider>
      </body>
    </html>
  )
}
