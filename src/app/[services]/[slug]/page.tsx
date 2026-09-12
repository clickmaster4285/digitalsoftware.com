import ServicesPage from "@/components/services/ServicesPage";
import { permanentRedirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ services: string; slug: string }>;
}) {
  const { services, slug } = await params;

  if (services === "search-engine-optimization" && slug.startsWith("seo-services-")) {
    permanentRedirect(`/${services}/locations/${slug}`);
  }

  return (
   <>
   <ServicesPage/>
   </>
  );
}
