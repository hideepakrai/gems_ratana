"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { UserForm } from "@/components/admin/users/UserForm";
import { toast } from "sonner";
import { addUser } from "@/lib/store/users/usersThunk";

export default function NewUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Name, Email and Password are required");
      return;
    }

    setLoading(true);
    try {
      // For admin users, the role is determined by the form value
      // we pass "admin" as the role type to the API to handle non-customer creation
      const result = await dispatch(
        addUser({
          userData: formData,
          role: "admin", 
        }),
      );
      if (addUser.fulfilled.match(result)) {
        toast.success("User created successfully");
        router.push("/admin/users");
      } else {
        toast.error((result.payload as string) || "Failed to create user");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <UserForm
        onSubmit={handleSubmit}
        loading={loading}
        title="Create New System User"
      />
    </div>
  );
}
