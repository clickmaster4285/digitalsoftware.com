

import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "ClickMasters — Software crafted with care",
  description: "An independent software studio designing and engineering web platforms, apps and AI products for ambitious founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${instrumentSerif.variable} font-sans`}
      >
        <Navbar />
        <Providers>
          <div className="relative w-full overflow-x-clip">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
