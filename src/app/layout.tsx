import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/store/Provider";
import { ControllerUser } from "@/components/ControllerUser/ControllerUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ControllerUser>
            {children}
            <Toaster />
          </ControllerUser>
        </Providers>
      </body>
    </html>
  );
}
