"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { UserForm } from "@/components/admin/users/UserForm";
import { toast } from "sonner";
import { fetchUsers, updateUser } from "@/lib/store/users/usersThunk";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  
  const { adminusers, loading: fetchLoading } = useAppSelector(
    (state) => state.adminUsers
  );

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // If users are already in store, find the specific one
    if (adminusers.length > 0) {
      const user = adminusers.find((u) => u._id === id);
      if (user) {
        setUserData(user);
      } else {
         // If not found in store, fetch them
         dispatch(fetchUsers({ role: "admin" }));
      }
    } else {
      dispatch(fetchUsers({ role: "admin" }));
    }
  }, [adminusers, id, dispatch]);

  // Update userData when adminusers changes and store was empty
  useEffect(() => {
    if (!userData && adminusers.length > 0) {
      const user = adminusers.find((u) => u._id === id);
      if (user) {
        setUserData(user);
      }
    }
  }, [adminusers, id, userData]);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const result = await dispatch(
        updateUser({
          id,
          customerData: formData,
        }),
      );
      if (updateUser.fulfilled.match(result)) {
        toast.success("User updated successfully");
        router.push("/admin/users");
      } else {
        toast.error((result.payload as string) || "Failed to update user");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading && !userData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Fetching user profile...
          </span>
        </div>
      </div>
    );
  }

  if (!userData && !fetchLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-slate-500 font-medium">User not found or has been deleted.</p>
          <button 
            onClick={() => router.push('/admin/users')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          >
            Return to user list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <UserForm
        initialData={userData}
        onSubmit={handleSubmit}
        loading={loading}
        title={`Edit User: ${userData?.name}`}
      />
    </div>
  );
}
