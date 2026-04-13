import { Page, PageStatus, PageSEO, PageBlock, SectionType } from "./pageType";

export const DEFAULT_SEO: PageSEO = {
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  ogImage: "",
};

export const DEFAULT_HERO = {
  title: "Wear Your Destiny",
  subtitle: "Authentic Ratna for Wealth, Health & Success",
  images: ["/assets/images/diamond_hero.png"],
  buttonText: "Discover Aura",
  buttonLink: "/aura",
  overlayOpacity: 40,
  autoPlay: true,
  imageAlt: "Premium gemstone hero",
};

export const normalizeHero = (hero: any) => {
  const legacySlide = Array.isArray(hero?.slides) ? hero.slides[0] : undefined;
  const legacyImages = Array.isArray(hero?.images)
    ? hero.images.filter(Boolean)
    : legacySlide?.image
      ? [legacySlide.image]
      : [];

  const normalized = {
    ...DEFAULT_HERO,
    ...(hero || {}),
    title: hero?.title || legacySlide?.title || DEFAULT_HERO.title,
    subtitle: hero?.subtitle || legacySlide?.subtitle || DEFAULT_HERO.subtitle,
    images: legacyImages.length > 0 ? legacyImages : DEFAULT_HERO.images,
    buttonText:
      hero?.buttonText || legacySlide?.btnText || DEFAULT_HERO.buttonText,
    buttonLink:
      hero?.buttonLink || legacySlide?.btnLink || DEFAULT_HERO.buttonLink,
    overlayOpacity:
      typeof hero?.overlayOpacity === "number"
        ? hero.overlayOpacity
        : DEFAULT_HERO.overlayOpacity,
    autoPlay:
      typeof hero?.autoPlay === "boolean" ? hero.autoPlay : DEFAULT_HERO.autoPlay,
    imageAlt: hero?.imageAlt || legacySlide?.title || DEFAULT_HERO.imageAlt,
  };

  return normalized;
};

export const createDefaultSectionContent = (type: SectionType): any => {
  switch (type) {
    case "hero":
      return { ...DEFAULT_HERO };
    case "navbar":
      return {
        logo: "",
        links: [
          { id: "1", label: "Shop", href: "/shop" },
          { id: "2", label: "Elements & Wishes", href: "/elements" },
          { id: "3", label: "Zodiac", href: "/zodiac" },
          { id: "4", label: "Brand", href: "/about" },
          { id: "5", label: "Contact", href: "/contact" }
        ]
      };
    case "trustbar":
      return {
        items: [
          { id: "1", icon: "Star", text: "4.8/5 Customer Rating" },
          { id: "2", icon: "ShieldCheck", text: "Certified Natural Gemstones" },
          { id: "3", icon: "Truck", text: "Free Shipping Across India" },
          { id: "4", icon: "Lock", text: "100% Secure Checkout" }
        ]
      };
    case "collections":
      return {
        title: "Imperial Earth Elements",
        subtitle: "Curated Rareness",
        collectionIds: [],
        layout: "grid",
        maxItems: 5,
      };
    case "cta":
      return {
        title: "Ready to find your perfect gemstone?",
        subtitle: "Our experts are here to help you choose the right energy for your journey.",
        buttonText: "Consult an Expert",
        buttonLink: "/contact",
        theme: "accent",
      };
    case "testimonials":
      return {
        title: "What Our Clients Say",
        items: [],
      };
    case "faq":
      return {
        title: "Frequently Asked Questions",
        items: [],
      };
    case "blog":
      return {
        title: "Latest From Our Blog",
        layout: "grid",
        maxPosts: 3,
      };
    case "usp":
      return {
        title: "Why Choose Us",
        items: [
          { id: "1", icon: "Gem", title: "Authentic Gems", description: "100% certified natural gemstones" },
          { id: "2", icon: "Truck", title: "Fast Delivery", description: "Secure worldwide shipping" },
          { id: "3", icon: "Shield", title: "Secure Payment", description: "Your data is always protected" },
        ],
      };
    default:
      return {};
  }
};

export function createPageDraft(): Page {
  const coreSections: PageBlock[] = [
    { id: "nav-1", type: "navbar", enabled: true, adminTitle: "Dynamic Navbar", content: createDefaultSectionContent("navbar") },
    { id: "hero-1", type: "hero", enabled: true, adminTitle: "Hero Slider", content: createDefaultSectionContent("hero") },
    { id: "trust-1", type: "trustbar", enabled: true, adminTitle: "Trust Banner", content: createDefaultSectionContent("trustbar") },
    { id: "collections-1", type: "collections", enabled: true, adminTitle: "Earth Elements (Categories)", content: createDefaultSectionContent("collections") },
    { id: "cta-1", type: "cta", enabled: true, adminTitle: "Call to Action", content: createDefaultSectionContent("cta") },
  ];

  return {
    title: "",
    slug: "",
    status: "draft",
    isPublished: false,
    hero: { ...DEFAULT_HERO },
    sections: coreSections,
    seo: { ...DEFAULT_SEO },
  };
}

export function normalizePage(page: any): Page {
  const status: PageStatus = page?.status === "published" || page?.isPublished ? "published" : "draft";
  const sections = Array.isArray(page?.sections) ? page.sections : [];
  const heroSection = sections.find((section: PageBlock) => section?.type === "hero");
  const heroFromSection = heroSection?.content
    ? normalizeHero(heroSection.content)
    : null;
  
  return {
    _id: page?._id ? String(page._id) : undefined,
    page: page?.page || "",
    title: page?.title || "",
    slug: page?.slug || "",
    status,
    isPublished: status === "published",
    hero: normalizeHero(page?.hero || heroFromSection || DEFAULT_HERO),
    sections,
    seo: {
      ...DEFAULT_SEO,
      ...(page?.seo || {}),
    },
    createdAt: page?.createdAt,
    updatedAt: page?.updatedAt,
  };
}

export function getStatusLabel(page: Partial<Page>) {
  return page.status === "published" ? "Published" : "Draft";
}

export function isPagePublished(page: Page): boolean {
  return page.status === "published" || page.isPublished === true;
}

export function getRouteLabel(slug: string): string {
  if (slug === "home") return "/";
  return `/${slug}`;
}
