// "use client";

// import React, { useEffect, useState, Suspense } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import {
//   Plus,
//   Edit,
//   Trash,
//   Mail,
//   Phone,
//   Search,
//   MapPin,
//   Clock,
//   User,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { deleteCustomer, fetchCustomers } from "@/lib/store/users/usersThunk";

// function CustomersPageContent() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { customers, loading, totalCustomers } = useAppSelector(
//     (state) => state.adminUsers,
//   );

//   const [searchQuery, setSearchQuery] = useState("");
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(
//       fetchCustomers({
//         role: "customers",
//         itemsPerPage: 50,
//         currentPage: 1,
//       }),
//     );
//   }, [dispatch]);

//   const handleDelete = async (id: string, name: string) => {
//     if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

//     setDeletingId(id);
//     const toastId = toast.loading(`Deleting customer ${name}...`);

//     try {
//       const resultAction = await dispatch(deleteCustomer(id));
//       if (deleteCustomer.fulfilled.match(resultAction)) {
//         toast.success(`Customer ${name} deleted successfully`, { id: toastId });
//       } else {
//         toast.error(
//           (resultAction.payload as string) || "Failed to delete customer",
//           { id: toastId },
//         );
//       }
//     } catch (err) {
//       toast.error("Something went wrong", { id: toastId });
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleEdit = (id: string) => {
//     router.push(`/admin/customers/${id}/edit`);
//   };

//   const handleAdd = () => {
//     router.push("/admin/customers/new");
//   };

//   const filteredCustomers = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (c.phone && c.phone.includes(searchQuery)),
//   );

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
//             Customers
//           </h1>
//           <p className="text-sm font-medium text-slate-500">
//             Manage your customer accounts, addresses, and profiles.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
//               <Search size={18} />
//             </div>
//             <Input
//               placeholder="Search customers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 h-11 w-full md:w-72 bg-white border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
//             />
//           </div>
//           <Button
//             onClick={handleAdd}
//             className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-11 px-6 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
//           >
//             <Plus size={20} /> Add Customer
//           </Button>
//         </div>
//       </div>

//       <div className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-2xl shadow-slate-200/40">
//         <Table>
//           <TableHeader className="bg-slate-50/50">
//             <TableRow className="hover:bg-transparent border-slate-100">
//               <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
//                 Customer Profile
//               </TableHead>
//               <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
//                 Contact
//               </TableHead>
//               <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
//                 Addresses
//               </TableHead>
//               <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
//                 Joined Date
//               </TableHead>
//               <TableHead className="text-right font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
//                 Actions
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center h-64">
//                   <div className="flex flex-col items-center gap-4">
//                     <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
//                     <span className="text-xs font-black uppercase tracking-widest text-slate-400">
//                       Synchronizing Customers...
//                     </span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : filteredCustomers.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   className="text-center h-64 text-slate-400"
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     <User className="h-12 w-12 opacity-10" />
//                     <p className="font-bold text-sm">No customers found.</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredCustomers.map((customer) => (
//                 <TableRow
//                   key={customer._id}
//                   className="group hover:bg-slate-50/50 border-slate-50 transition-colors"
//                 >
//                   <TableCell className="px-6 py-4">
//                     <div className="flex items-center gap-4">
//                       <div className="h-12 w-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
//                         {customer.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-bold text-slate-900 text-[15px]">
//                           {customer.name}
//                         </span>
//                         <span className="text-xs text-slate-400 font-medium">
//                           ID:{" "}
//                           {customer._id &&
//                             customer._id
//                               .substring(customer?._id.length - 8)
//                               .toUpperCase()}
//                         </span>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-6 py-4">
//                     <div className="flex flex-col gap-1.5">
//                       <div className="flex items-center gap-2 text-slate-600">
//                         <Mail size={14} className="text-slate-400" />
//                         <span className="text-sm font-medium">
//                           {customer.email}
//                         </span>
//                       </div>
//                       {customer.phone && (
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Phone size={14} className="text-slate-400" />
//                           <span className="text-sm font-medium">
//                             {customer.phone}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
//                         <MapPin size={14} />
//                       </div>
//                       <span className="text-sm font-bold text-slate-700">
//                         {customer.addresses?.length || 0} Saved
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-6 py-4">
//                     <div className="flex items-center gap-2 text-slate-500">
//                       <Clock size={14} className="text-slate-400" />
//                       <span className="text-sm font-medium">
//                         {new Date(customer.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-6 py-4 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleEdit(String(customer._id))}
//                         className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
//                       >
//                         <Edit size={18} />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         disabled={deletingId === customer._id}
//                         onClick={() =>
//                           handleDelete(String(customer._id), customer.name)
//                         }
//                         className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
//                       >
//                         <Trash size={18} />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default function CustomersPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex items-center justify-center h-screen">
//           Loading Page...
//         </div>
//       }
//     >
//       <CustomersPageContent />
//     </Suspense>
//   );
// }

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Edit,
  Trash,
  Mail,
  Phone,
  Search,
  MapPin,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { deleteUser, fetchUsers } from "@/lib/store/users/usersThunk";

function CustomersPageContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { customers, loading, totalCustomers, adminusers } = useAppSelector(
    (state) => state.adminUsers,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;

  const totalPages = Math.max(
    1,
    Math.ceil((totalCustomers || 0) / itemsPerPage),
  );

  const updateQueryParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        role: "customer",
        itemsPerPage,
        currentPage,
      }),
    );
  }, [dispatch, currentPage, itemsPerPage]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    const toastId = toast.loading(`Deleting customer ${name}...`);

    try {
      const resultAction = await dispatch(deleteUser(id));

      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success(`Customer ${name} deleted successfully`, { id: toastId });

        dispatch(
          fetchUsers({
            role: "customer",
            itemsPerPage,
            currentPage,
          }),
        );
      } else {
        toast.error(
          (resultAction.payload as string) || "Failed to delete customer",
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
    router.push(
      `/admin/customers/${id}/edit?role=customer&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,
    );
  };

  const handleAdd = () => {
    router.push("/admin/customers/new");
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.phone && c.phone.includes(searchQuery)),
    );
  }, [customers, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateQueryParams({ currentPage: page });
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    updateQueryParams({
      itemsPerPage: Number(e.target.value),
      currentPage: 1,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Customers
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage your customer accounts, addresses, and profiles.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 w-full md:w-72 bg-white border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
            />
          </div>

          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="h-11 rounded-2xl border border-slate-200 px-4 text-sm shadow-sm"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>

          <Button
            onClick={handleAdd}
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-11 px-6 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Customer
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-2xl shadow-slate-200/40">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Customer Profile
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Contact
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Addresses
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] h-14 px-6">
                Joined Date
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
                      Synchronizing Customers...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-64 text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-12 w-12 opacity-10" />
                    <p className="font-bold text-sm">No customers found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow
                  key={customer._id}
                  className="group hover:bg-slate-50/50 border-slate-50 transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-[15px]">
                          {customer.name}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          ID:{" "}
                          {customer._id &&
                            customer._id
                              .substring(customer._id.length - 8)
                              .toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">
                          {customer.email}
                        </span>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone size={14} className="text-slate-400" />
                          <span className="text-sm font-medium">
                            {customer.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                        <MapPin size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        {customer.addresses?.length || 0} Saved
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-sm font-medium">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(String(customer._id))}
                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === customer._id}
                        onClick={() =>
                          handleDelete(String(customer._id), customer.name)
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

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-slate-600">
          Total Customers:{" "}
          <span className="font-semibold">{totalCustomers || 0}</span>
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-xl"
          >
            <ChevronLeft size={16} className="mr-1" />
            Prev
          </Button>

          <div className="px-3 text-sm font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-xl"
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading Page...
        </div>
      }
    >
      <CustomersPageContent />
    </Suspense>
  );
}
