import { Metadata } from "next";
import Component from "@/components/pages/AboutGemPage";
import PageContentRenderer from "@/components/pages/PageContentRenderer";
import { getPageData } from "@/lib/getPageData";
import { isPagePublished } from "@/lib/store/pages/pageHelpers";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("about");

  if (page && isPagePublished(page)) {
    return {
      title: page.seo?.metaTitle || page.title || "About Us",
      description: page.seo?.metaDescription || "",
      keywords: page.seo?.keywords || undefined,
      openGraph: {
        title: page.seo?.metaTitle || page.title || "About Us",
        description: page.seo?.metaDescription || "",
        images: page.seo?.ogImage ? [page.seo.ogImage] : undefined,
      },
    };
  }

  return {
    title: "About GemsRatna",
    description: "Learn more about our story, mission and gemstone craftsmanship.",
  };
}

export default async function Page() {
  const page = await getPageData("about");

  if (page && isPagePublished(page)) {
    return <PageContentRenderer page={page} />;
  }

  return <Component />;
}
