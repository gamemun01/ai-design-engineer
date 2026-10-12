import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban Board — AI Design Engineer Playground",
  description:
    "Buildable proof that the skill-produced BoardPanel.tsx compiles and renders against a real React/Next.js + Tailwind stack.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
