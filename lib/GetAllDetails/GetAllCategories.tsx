"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCategories } from "../store/categories/categoriesThunk";

export default function GetAllCategories({
  type = "admin",
}: {
  type?: string;
}) {
  const { allCategories, categoryLoading, hasCategoriesFetched } = useSelector(
    (state: RootState) => state.adminCategories,
  );

  const dispatch = useDispatch<AppDispatch>();

  const { gemsratnaUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!gemsratnaUser && type) return;

    if (!hasCategoriesFetched && !categoryLoading) {
      dispatch(fetchCategories());
    }
  }, [gemsratnaUser, hasCategoriesFetched, categoryLoading]);

  return null;
}
