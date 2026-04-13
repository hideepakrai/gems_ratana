import { ObjectId } from "mongodb";

export function getPageLookupQuery(param: string) {
  if (ObjectId.isValid(param)) {
    return { _id: new ObjectId(param) };
  }

  const slug =
    param === "home" || param === "root" || param === "index"
      ? "/"
      : param.startsWith("/")
        ? param
        : `/${param}`;

  return {
    $or: [{ page: param }, { slug }, { slug: param }],
  };
}
