import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  Save,
  Shield,
  Activity,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface UserFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
}

export const UserForm: React.FC<UserFormProps> = ({
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
    role: "staff",
    status: "active",
    isTenantOwner: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // Password is never pre-filled
        role: initialData.role || "staff",
        status: initialData.status || "active",
        isTenantOwner: initialData.isTenantOwner || false,
      });
    }
  }, [initialData]);

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
            type="button"
            className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              {title}
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Manage system access and permissions for admin users.
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-11 px-8 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={20} /> Save User
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
                    required
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
                    required
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  System Role
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 z-10 pointer-events-none">
                    <Shield size={16} />
                  </div>
                  <Select
                    value={formData.role}
                    onValueChange={(val) =>
                      setFormData({ ...formData, role: val })
                    }
                  >
                    <SelectTrigger className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 font-medium">
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="staff">Staff Member</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
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
                    required={!initialData}
                    className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Access Control Section */}
          <div className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Shield size={18} />
              </div>
              <h3 className="font-bold text-slate-700">Access Control</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-700">
                    Account Status
                  </Label>
                  <p className="text-xs text-slate-400">
                    Active users can log in to the system.
                  </p>
                </div>
                <Select
                  value={formData.status}
                  onValueChange={(val) =>
                    setFormData({ ...formData, status: val })
                  }
                >
                  <SelectTrigger className="w-[120px] h-10 bg-white border-slate-100 rounded-xl shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-700">
                    Is Tenant Owner
                  </Label>
                  <p className="text-xs text-slate-400">
                    Has full administrative rights over the tenant.
                  </p>
                </div>
                <Switch
                  checked={formData.isTenantOwner}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isTenantOwner: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary Section */}
        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/30 sticky top-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
              User Preview
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {formData.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-slate-800 truncate">
                    {formData.name || "New User"}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[9px] ${
                    formData.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tenant Owner</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[9px] ${
                    formData.isTenantOwner 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {formData.isTenantOwner ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col gap-2">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 flex gap-3">
                <Activity size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-indigo-700 font-medium">
                  Ensure all information is correct. Users will receive access based on their assigned role and account status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
