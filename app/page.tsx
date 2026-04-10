import { Metadata } from "next";
import GemHomePage from "@/components/pages/GemHomePage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GemsRatna | Premium Natural Gemstones",
    description:
      "Luxury gemstone jewelry, healing crystals and spiritual products designed to convert.",
  };
}

export default function Page() {
  return <GemHomePage />;
}
