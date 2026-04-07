import HomePage from "@/components/pages/HomePage";
import { Metadata } from "next";
import { getPageData } from "@/lib/getPageData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageData("home");

  return {
    title: data?.metaTitle || "GemsRatna",
    description: data?.metaDescription || "Natural Power & Spiritual Elegance",
  };
}

export default async function Page() {
  const data = await getPageData("home");

  return <HomePage data={data} />;
}
