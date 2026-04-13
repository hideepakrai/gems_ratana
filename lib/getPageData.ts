import { connectTenantDB } from "./db";
import { isHex } from "@/lib/utils";
import { ObjectId } from "mongodb";

function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export async function getPageData(slug: string) {
  console.log("Fetching page data for slug:", slug);
  const db = await connectTenantDB();
  const page = await db.collection("pages").findOne({ slug });

  return serialize(page);
}

export async function getSingleProduct(id: string) {
  const db = await connectTenantDB();
  const productColl = db.collection("products");

  const matchStage: any = {};
  if (isHex(id)) {
    matchStage._id = new ObjectId(id);
  } else {
    matchStage.slug = id;
  }

  const products = await productColl
    .aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      },

      // {
      //   $addFields: {
      //     variants: {
      //       $sortArray: {
      //         input: "$variants",
      //         sortBy: { createdAt: -1 },
      //       },
      //     },
      //   },
      // },
    ])
    .toArray();

  return serialize(products[0]);
}
