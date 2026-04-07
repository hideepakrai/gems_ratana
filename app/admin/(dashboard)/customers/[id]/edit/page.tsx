"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { toast } from "sonner";
import { fetchUsers, updateUser } from "@/lib/store/users/usersThunk";

export default function EditCustomerPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;
  const role = searchParams.get("role") || "customer";
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    customers,
    loading: storeLoading,
    hasFetchedCustomers,
  } = useAppSelector((state) => state.adminUsers);

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasFetchedCustomers) {
      dispatch(fetchUsers({ role, currentPage, itemsPerPage }));
    }
  }, [hasFetchedCustomers]);

  useEffect(() => {
    if (hasFetchedCustomers) {
      const found = customers.find((c) => c._id === id);
      if (found) {
        setCustomer(found);
      } else {
        toast.error("Customer not found");
        router.push("/admin/customers");
      }
    }
  }, [id, customers, hasFetchedCustomers]);

  const handleSubmit = async (formData: any) => {
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(
        updateUser({ id: id as string, customerData: formData }),
      );
      if (updateUser.fulfilled.match(result)) {
        toast.success("Customer updated successfully");
        router.push(
          `/admin/customers?role=${role}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,
        );
      } else {
        toast.error((result.payload as string) || "Failed to update customer");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasFetchedCustomers || !customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Loading Customer Profile...
        </span>
      </div>
    );
  }

  return (
    <div className="py-6">
      <CustomerForm
        initialData={customer}
        onSubmit={handleSubmit}
        loading={loading}
        title="Edit Customer Profile"
      />
    </div>
  );
}
