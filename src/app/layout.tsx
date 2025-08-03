import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication | Devkit",
  description: "A template to use or ease the front-end developer life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                toast: "toast",
                title: "title",
                description: "!text-red-900",
                icon: "pr-6",
                actionButton: "action-button",
                cancelButton: "cancel-button",
                closeButton: "close-button",
              },
            }}
          />
        </main>
      </body>
    </html>
  );
}
