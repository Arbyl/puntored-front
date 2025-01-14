import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { FAB } from "@/components/FAB/FAB";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "Prueba Tecnica PuntoRed",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Analytics />
          <Header />
          {children}
          <FAB />
        </div>
      </body>
    </html>
  );
}