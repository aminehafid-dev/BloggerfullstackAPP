import type { Metadata } from "next";
import "@/globals.css";

export const metadata: Metadata = {
  title: "BlogApp - Blog & App Marketplace",
  description: "Share blogs and discover amazing apps in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
