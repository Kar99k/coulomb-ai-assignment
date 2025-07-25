import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Assignment for coulomb ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://archive-api.open-meteo.com" crossOrigin="anonymous"/>
      <body
        className={`${roboto.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
