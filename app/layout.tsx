import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'

import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";



const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CreatiFlow",
  description: "AI Image Generation Tool"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"} appearance={{ variables: { colorPrimary: "#000" } }}>
      <html lang="en">
        <body
          className={cn("IBM_PlexSans", ibmSans.variable)}
        >

          <header className="flex justify-end items-center p-4 gap-4 h-16">
            {/* <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
