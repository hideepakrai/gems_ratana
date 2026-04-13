import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageContentRenderer from "@/components/pages/PageContentRenderer";
import { getPageData } from "@/lib/getPageData";
import { isPagePublished } from "@/lib/store/pages/pageHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page || !isPagePublished(page)) return { title: "Page Not Found" };

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || "",
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || "",
      images: page.seo?.ogImage ? [page.seo.ogImage] : undefined,
    },
  };
}

export default async function DynamicCmsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page || !isPagePublished(page)) {
    notFound();
  }

  return <PageContentRenderer page={page} />;
}
