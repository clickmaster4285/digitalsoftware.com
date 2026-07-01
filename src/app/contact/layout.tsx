import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ClickMasters Digital Marketing",
  description:
    "Get in touch with ClickMasters — award-winning digital marketing agency serving businesses across the USA, UK, UAE, and Pakistan.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
