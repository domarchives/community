import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getServerSession } from "next-auth";

import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";
import authOptions from "@/lib/auth-options";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kita",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID as string} />
    </html>
  );
}
