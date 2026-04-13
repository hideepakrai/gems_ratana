import { NextRequest, NextResponse } from "next/server";
import { getPageModel } from "@/models";
import { normalizePage } from "@/lib/store/pages/pageHelpers";

// GET all pages
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const PageModel = await getPageModel();

    if (slug) {
      const page = await PageModel.findOne({ slug });
      if (!page) {
        return NextResponse.json(
          { success: false, message: "Page not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, page: normalizePage(page) });
    }

    const pages = await PageModel.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, pages: pages.map(normalizePage) });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch pages" }, { status: 500 });
  }
}

// POST create a new page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
      seo,
      sections,
      status,
      isPublished,
      template,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, message: "Title and slug are required" }, { status: 400 });
    }

    const PageModel = await getPageModel();

    // Check slug uniqueness
    const existingPage = await PageModel.findOne({ slug });
    if (existingPage) {
      return NextResponse.json({ success: false, message: "A page with this slug already exists" }, { status: 400 });
    }

    const now = new Date();
    const normalizedStatus = status === "published" || isPublished ? "published" : "draft";
    const newPage = normalizePage({
      title,
      slug,
      content: content || [],
      template,
      status: normalizedStatus,
      seo: {
        metaTitle: seo?.metaTitle ?? metaTitle ?? "",
        metaDescription: seo?.metaDescription ?? metaDescription ?? "",
        keywords: seo?.keywords ?? keywords ?? "",
        ogImage: seo?.ogImage ?? ogImage ?? "",
      },
      sections,
      createdAt: now,
      updatedAt: now,
      isPublished: normalizedStatus === "published",
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
    });

    const { _id, ...pageToInsert } = newPage as any;
    const result = await PageModel.insertOne(pageToInsert);
    
    return NextResponse.json({ 
      success: true, 
      page: { ...newPage, _id: result.insertedId.toString() } 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ success: false, error: "Failed to create page" }, { status: 500 });
  }
}
