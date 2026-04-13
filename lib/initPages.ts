import { Db } from "mongodb";
import { DEFAULT_HERO } from "./store/pages/pageHelpers";

export async function initPagesCollection(db: Db) {
  const pagesCollection = db.collection("pages");

  const defaultPages = [
    {
      page: "home",
      slug: "home",
      title: "Home Page",
      status: "published",
      hero: {
        ...DEFAULT_HERO,
        images: ["/assets/images/diamond_hero.png"],
      },
      sections: [
        {
          id: "hero-1",
          type: "hero",
          enabled: true,
          content: {
            ...DEFAULT_HERO,
            images: ["/assets/images/diamond_hero.png"],
          }
        },
        {
          id: "trust-1",
          type: "trustbar",
          enabled: true,
          content: {
            items: [
              { id: "t1", icon: "Star", text: "4.8/5 Customer Rating" },
              { id: "t2", icon: "ShieldCheck", text: "Certified Authentic" },
              { id: "t3", icon: "Truck", text: "Free Global Shipping" }
            ]
          }
        }
      ],
      seo: {
        metaTitle: "GemsRatna | Wear Your Destiny",
        metaDescription: "Premium natural gemstones and spiritual wellness products.",
        keywords: ["gemstones", "ratna", "luxury"],
        ogImage: ""
      }
    },
    {
      page: "about",
      slug: "about",
      title: "About Us",
      status: "draft",
      sections: [
        {
          id: "hero-about",
          type: "hero",
          enabled: true,
          content: {
            slides: [
              {
                id: "slide-about",
                title: "Our Sacred Legacy",
                subtitle: "The story of GemsRatna",
                image: "",
                btnText: "Our Story",
                btnLink: "#"
              }
            ]
          }
        }
      ],
      seo: {
        metaTitle: "About Us | GemsRatna",
        metaDescription: "Learn about our history",
        keywords: ["about", "history"],
        ogImage: ""
      }
    }
  ];

  let insertedCount = 0;
  for (const pageItem of defaultPages) {
    // We check for slug or page to avoid duplicates
    const existing = await pagesCollection.findOne({ 
      $or: [{ page: pageItem.page }, { slug: pageItem.slug }] 
    });

    if (!existing) {
      await pagesCollection.insertOne({
        ...pageItem,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      insertedCount += 1;
    }
  }

  if (insertedCount > 0) {
    console.log(`CMS Pages seeded with ${insertedCount} default record(s).`);
  }
}
