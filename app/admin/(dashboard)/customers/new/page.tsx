"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { toast } from "sonner";
import { addUser } from "@/lib/store/users/usersThunk";

export default function NewCustomerPage() {
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
      const result = await dispatch(
        addUser({
          userData: formData,
          role: "customer",
        }),
      );
      if (addUser.fulfilled.match(result)) {
        toast.success("Customer added successfully");
        router.back();
      } else {
        toast.error((result.payload as string) || "Failed to add customer");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <CustomerForm
        onSubmit={handleSubmit}
        loading={loading}
        title="Create New Customer"
      />
    </div>
  );
}
