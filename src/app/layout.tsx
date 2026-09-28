import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sora Project — Dashboard Manajemen & Cost Control Kontraktor Interior",
  description: "Enterprise contractor operations dashboard styled after TailAdmin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F1F5F9] text-[#64748B] antialiased">
        {children}
      </body>
    </html>
  );
}
