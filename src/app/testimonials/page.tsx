import { Metadata } from "next";
import TestimonialsPage from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Digital Marketing Agency Reviews - Client Testimonials",
  description:
    "Read digital marketing agency reviews and testimonials from real US clients who achieved growth through our result-driven marketing strategies.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/testimonials",
  },
  openGraph: {
    title: "Digital Marketing Agency Reviews - Client Testimonials",
    description:
      "Read digital marketing agency reviews and testimonials from real US clients who achieved growth through our result-driven marketing strategies.",
    url: "https://clickmastersdigitalmarketing.com/testimonials",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency Reviews - Client Testimonials",
    description:
      "Read digital marketing agency reviews and testimonials from real US clients who achieved growth through our result-driven marketing strategies.",
  },
};

export default function Page() {
  return <TestimonialsPage />;
}