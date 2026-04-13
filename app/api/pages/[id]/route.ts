import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPageModel } from "@/models";
import { ObjectId } from "mongodb";
import { normalizePage } from "@/lib/store/pages/pageHelpers";

// GET a single page by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const PageModel = await getPageModel();
    const page = await PageModel.findOne({ _id: new ObjectId(id) });

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, page: normalizePage(page) });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch page" },
      { status: 500 },
    );
  }
}

// PUT update an existing page
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const PageModel = await getPageModel();
    console.log("PUT /api/pages/[id] body:", body);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID" },
        { status: 400 },
      );
    }

    // Check slug uniqueness if it's being updated
    if (body.slug) {
      const existingPage = await PageModel.findOne({
        slug: body.slug,
        _id: { $ne: new ObjectId(id) },
      });
      if (existingPage) {
        return NextResponse.json(
          { success: false, message: "A page with this slug already exists" },
          { status: 400 },
        );
      }
    }

    const { _id, ...updateData } = body;
    const normalizedStatus =
      updateData.status === "published" || updateData.isPublished
        ? "published"
        : updateData.status === "draft"
          ? "draft"
          : undefined;

    if (normalizedStatus) {
      updateData.status = normalizedStatus;
      updateData.isPublished = normalizedStatus === "published";
    } else if (typeof updateData.isPublished === "boolean") {
      updateData.status = updateData.isPublished ? "published" : "draft";
    }

    updateData.updatedAt = new Date();

    const result = await PageModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    console.log("UPDATE RESULT:", {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    const updatedPage = await PageModel.findOne({ _id: new ObjectId(id) });
    console.log("UPDATED PAGE:", updatedPage);

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    revalidatePath("/");
    revalidatePath("/admin/pages");

    return NextResponse.json({
      success: true,
      message: "Page updated successfully",
      page: normalizePage(updatedPage),
    });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update page" },
      { status: 500 },
    );
  }
}

// DELETE a page
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const PageModel = await getPageModel();
    const result = await PageModel.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete page" },
      { status: 500 },
    );
  }
}
