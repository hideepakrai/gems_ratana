"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash,
  Mail,
  Search,
  Clock,
  User,
  Shield,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { deleteUser, fetchUsers } from "@/lib/store/users/usersThunk";

function UsersPageContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { adminusers, loading } = useAppSelector(
    (state) => state.adminUsers,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      fetchUsers({
        role: "admin", // This will fetch non-customer users in the API
      }),
    );
  }, [dispatch]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    const toastId = toast.loading(`Deleting user ${name}...`);

    try {
      const resultAction = await dispatch(deleteUser(id));

      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success(`User ${name} deleted successfully`, { id: toastId });
        // Refresh handled by slice
      } else {
        toast.error(
          (resultAction.payload as string) || "Failed to delete user",
          { id: toastId },
        );
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/users/${id}/edit`);
  };

  const handleAdd = () => {
    router.push("/admin/users/new");
  };

  const filteredUsers = useMemo(() => {
    return adminusers.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [adminusers, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Users
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage admin accounts, roles, and system permissions.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 w-full md:w-72 bg-white border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
            />
          </div>

          <Button
            onClick={handleAdd}
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-11 px-6 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add User
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-2xl shadow-slate-200/40">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                User Profile
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Role & Status
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Ownership
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Created Date
              </TableHead>
              <TableHead className="text-right font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-64">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Synchronizing Users...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-64 text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-12 w-12 opacity-10" />
                    <p className="font-bold text-sm">No users found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  className="group hover:bg-slate-50/50 border-slate-50 transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-[15px]">
                          {user.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400">
                           <Mail size={12} />
                           <span className="text-xs font-medium">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Shield size={14} className="text-slate-400" />
                        <span className="text-sm font-bold capitalize">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className={user.status === 'active' ? 'text-emerald-500' : 'text-slate-300'} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          user.status === "active" ? "text-emerald-600" : "text-slate-400"
                        }`}>
                          {user.status || "active"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    {user.isTenantOwner ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100/50 shadow-sm">
                        <Shield size={12} className="fill-amber-600/10" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Owner</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium ml-3">Regular User</span>
                    )}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-sm font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(String(user._id))}
                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === user._id}
                        onClick={() =>
                          handleDelete(String(user._id), user.name)
                        }
                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 rounded-[2rem] border border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Total System Users: {adminusers.length}
          </span>
        </div>
        <p className="text-[10px] font-medium text-slate-400 italic">
          * Admin users have full access to the dashboard based on their role.
        </p>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Initializing Workspace...
            </span>
          </div>
        </div>
      }
    >
      <UsersPageContent />
    </Suspense>
  );
}
