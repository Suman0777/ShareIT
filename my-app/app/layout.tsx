import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { LightRays } from "@/components/ui/light-rays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CosmoDrop",
  description: "Fast, secure, no-storage file sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {/* Fixed full-screen background */}
        <div className="fixed inset-0 z-0 bg-black">
          <LightRays
            color="rgba(59, 130, 100, 0.35)"
            speed={5}
            count={20}
            blur={48}
          />
        </div>
        <Navbar />
        <main className="relative z-10 flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}
