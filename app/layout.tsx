import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Social Network - Reimagining friendships",
  description: "CPSC 471 Project - The Social Network - Connecting people",
};

export default function RootLayout({
  children,
  session // include prop
}: Readonly<{
  children: React.ReactNode;
  session: any; // does our session object have a type
}>) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
