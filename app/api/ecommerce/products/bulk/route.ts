import { connectTenantDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const db = await connectTenantDB();
    const productColl = db.collection("products");
    const attributeSetColl = db.collection("attribute_sets");
    const body = await request.json();

    const newProductArray: any[] = [];

    for (let product of body) {
      const variants = product.variants;
      delete product.variants;
      const attributeSetIds = await attributeSetColl
        .find({
          key: { $in: product.attributeSetIds },
        })
        .toArray();

      const mappedAttributes = attributeSetIds
        .map((attrset: any) => {
          return attrset.attributes.map((d: any) => {
            return {
              ...d,
              attributeSetId: attrset.key,
            };
          });
        })
        .flat();

      const options = product.options.map((option: any) => {
        const singleOption = mappedAttributes.find(
          (opt: any) => opt.key === option.key,
        );

        return {
          attributeSetId: singleOption?.attributeSetId,
          values:
            singleOption && singleOption.options
              ? singleOption.options
              : option.values,
          selectedValues: option.values,
          useForVariants: option.useForVariants,
          label: option?.label,
          key: option.key,
        };
      });

      const result = await productColl.insertOne({
        ...product,
        options,
        createdAt: new Date(),
      });
      const variantWithId = variants.map((variant: any) => ({
        ...variant,
        productId: result.insertedId,
        _id: new ObjectId(),
        createdAt: new Date(),
      }));
      const variantColl = db.collection("variants");
      await variantColl.insertMany(variantWithId);

      newProductArray.push({
        ...product,
        _id: result.insertedId,
        variants: variantWithId,
      });
    }
    return NextResponse.json(
      {
        message: "Product created successfully",
        data: newProductArray,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 },
    );
  }
}
