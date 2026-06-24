import type { Metadata } from "next";
import LandingPage from "@/components/site/LandingPage";

export const metadata: Metadata = {
  title:
    "Award-Winning Digital Marketing Agency in United States | ClickMasters",
  description:
    "Your full-service digital marketing agency for SEO, PPC, web design & performance marketing. Elevate your marketing strategies with top digital marketing company in United States.",
  // alternates: {
  //   canonical: "https://clickmastersdigitalmarketing.com",
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-snippet": -1,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //   },
  //},  
};

export default function Home() {
  return <LandingPage />;
}