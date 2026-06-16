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
  title: "ClickMasters Software crafted with care",
  description:
    "An independent software studio designing and engineering web platforms, apps and AI products for ambitious founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      {/* ✅ Google Tag Manager (HEAD SCRIPT) */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PQRV6WJ8');
            `,
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${inter.variable} ${instrumentSerif.variable} font-sans`}
      >
        {/* ✅ Google Tag Manager (NOSCRIPT - must be first inside body) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQRV6WJ8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />

        <Providers>
          <div className="relative w-full overflow-x-clip">{children}</div>
        </Providers>

        <Footer />
      </body>
    </html>
  );
}