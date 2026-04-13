export type SectionType = 
  | "hero" 
  | "collections" 
  | "cta" 
  | "testimonials" 
  | "faq" 
  | "blog" 
  | "usp"
  | "navbar"
  | "trustbar";

export interface PageBlock {
  id: string;
  type: SectionType;
  enabled: boolean;
  adminTitle?: string;
  content: any; // Type-specific content
}

export interface HeroContent {
  title: string;
  subtitle: string;
  images: string[];
  buttonText: string;
  buttonLink: string;
  overlayOpacity?: number;
  autoPlay?: boolean;
  imageAlt?: string;
}

export interface NavbarLink {
  id: string;
  label: string;
  href: string;
}

export interface NavbarContent {
  logo: string;
  links: NavbarLink[];
}

export interface TrustItem {
  id: string;
  icon: string;
  text: string;
}

export interface TrustBarContent {
  items: TrustItem[];
}

export interface CollectionsContent {
  title: string;
  subtitle?: string;
  collectionIds: string[];
  layout: "grid" | "carousel";
  maxItems?: number;
}

export interface CTAContent {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  buttonText: string;
  buttonLink: string;
  theme: "dark" | "light" | "accent";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  items: FAQItem[];
}

export interface BlogContent {
  title: string;
  layout: "grid" | "list";
  maxPosts: number;
  category?: string;
}

export interface USPItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface USPContent {
  title?: string;
  items: USPItem[];
}

export type PageStatus = "draft" | "published";

export interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

export interface Page {
  _id?: string;
  page?: string; // Identifier e.g. "home"
  title: string;
  slug: string;
  status: PageStatus;
  isPublished: boolean;
  hero?: HeroContent | null;
  sections: PageBlock[];
  seo: PageSEO;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
