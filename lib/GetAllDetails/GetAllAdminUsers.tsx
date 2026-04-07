"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../store/users/usersThunk";

export const GetAllAdminUsers = () => {
  const dispatch = useAppDispatch();
  const { loading, hasFetchedAdminUsers } = useAppSelector(
    (state) => state.adminUsers,
  );

  useEffect(() => {
    if (hasFetchedAdminUsers && !loading) return;
    dispatch(fetchUsers({}));
  }, []);

  return null;
};
