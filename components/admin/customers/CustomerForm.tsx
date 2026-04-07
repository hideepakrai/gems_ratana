import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Plus,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  ArrowLeft,
  Save,
} from "lucide-react";
import { AddressForm } from "./AddressForm";
import { useRouter } from "next/navigation";
import { CustomerAddress } from "@/lib/store/users/userSlice";

interface CustomerFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  onSubmit,
  loading,
  title,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    addresses: [] as CustomerAddress[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // Password is never pre-filled
        phone: initialData.phone || "",
        addresses: initialData.addresses || [],
      });
    }
  }, [initialData]);

  const handleAddAddress = () => {
    const newAddress: CustomerAddress = {
      _id: Math.random().toString(36).substr(2, 9),
      label: "New Address",
      addressLine1: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      isDefault: formData.addresses.length === 0,
    };
    setFormData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
    }));
  };

  const handleAddressChange = (
    id: string,
    updatedFields: Partial<CustomerAddress>,
  ) => {
    setFormData((prev) => {
      let newAddresses = prev.addresses.map((addr) =>
        addr._id === id ? { ...addr, ...updatedFields } : addr,
      );

      // If this address is set to default, unset others
      if (updatedFields.isDefault) {
        newAddresses = newAddresses.map((addr) =>
          addr._id === id ? addr : { ...addr, isDefault: false },
        );
      }

      return { ...prev, addresses: newAddresses };
    });
  };

  const handleRemoveAddress = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr._id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              {title}
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Manage profile information and address collection.
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-11 px-8 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={20} /> Save Profile
            </>
          )}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 space-y-8">
          {/* General Information Section */}
          <div className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <User size={18} />
              </div>
              <h3 className="font-bold text-slate-700">General Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                    <User size={16} />
                  </div>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                    <Mail size={16} />
                  </div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Phone Number
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                    <Phone size={16} />
                  </div>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91-XXXXXXXXXX"
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  {initialData ? "Change Password (Optional)" : "Password"}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                    <Lock size={16} />
                  </div>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <MapPin size={18} />
                </div>
                <h3 className="font-bold text-slate-700">Customer Addresses</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAddress}
                className="h-9 rounded-xl border-slate-100 text-slate-500 hover:bg-slate-50 gap-2 text-xs font-bold"
              >
                <Plus size={16} /> Add New Address
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {formData.addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-400 bg-white">
                  <MapPin className="h-10 w-10 mb-2 opacity-10" />
                  <p className="text-xs font-black uppercase tracking-widest">
                    No address profile found
                  </p>
                </div>
              ) : (
                formData.addresses.map((address) => (
                  <AddressForm
                    key={address._id}
                    address={address}
                    onChange={handleAddressChange}
                    onRemove={handleRemoveAddress}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/30">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
              Customer Summary
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  {formData.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-slate-800 truncate">
                    {formData.name || "Untitled Profile"}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {formData.email || "No email provided"}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Addresses</span>
                  <span className="font-bold text-slate-700">
                    {formData.addresses.length}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Default Address</span>
                  <span className="font-bold text-slate-700">
                    {formData.addresses.find((a) => a.isDefault)?.label ||
                      "None"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
