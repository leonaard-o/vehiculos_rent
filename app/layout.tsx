import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import {
    ClerkProvider,
   
  } from '@clerk/nextjs'

// Definir fuentes
const outfit = Outfit({ subsets: ["latin"] });



// Configuración de metadata
export const metadata: Metadata = {
  title: "Admin Cars",
  description: "Rental Cars",
};

// Componente raíz
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
        <body className={outfit.className}>
            <NextTopLoader />
            
            {children}
            <Toaster/>
        </body>
        </html>
    </ClerkProvider>
  );
}

