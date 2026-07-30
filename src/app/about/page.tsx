import { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us - Trusted Digital Marketing Agency in the US",
  description:
    "Learn about our digital marketing agency's mission, values, and expert team dedicated to helping US businesses grow through result-driven strategies.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/about",
  },
  openGraph: {
    title: "About Us - Trusted Digital Marketing Agency in the US",
    description:
      "Learn about our digital marketing agency's mission, values, and expert team dedicated to helping US businesses grow through result-driven strategies.",
    url: "https://clickmastersdigitalmarketing.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Trusted Digital Marketing Agency in the US",
    description:
      "Learn about our digital marketing agency's mission, values, and expert team dedicated to helping US businesses grow through result-driven strategies.",
  },
};

export default function Page() {
  return <AboutPage />;
}