import { NextRequest, NextResponse } from "next/server";
import { getPageModel } from "@/models";
import { normalizePage } from "@/lib/store/pages/pageHelpers";

export async function GET(req: NextRequest) {
  try {
    const PageModel = await getPageModel();
    const page = await PageModel.findOne({ slug: "home" });
    
    if (!page) {
      return NextResponse.json(
        { success: false, message: "Home page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: normalizePage(page) });
  } catch (error) {
    console.error("Error fetching home page:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch home page" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const PageModel = await getPageModel();
    
    const now = new Date();
    const updateData = {
      ...body,
      updatedAt: now,
    };

    // Remove _id from update
    if (updateData._id) delete updateData._id;

    const result = await PageModel.findOneAndUpdate(
      { slug: "home" },
      { $set: updateData },
      { returnDocument: "after", upsert: true }
    );

    return NextResponse.json({ success: true, data: normalizePage(result) });
  } catch (error) {
    console.error("Error updating home page:", error);
    return NextResponse.json({ success: false, error: "Failed to update home page" }, { status: 500 });
  }
}
