import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash, Home, Briefcase, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerAddress } from "@/lib/store/users/userSlice";

interface AddressFormProps {
  address: CustomerAddress;
  onChange: (id: string, updatedAddress: Partial<CustomerAddress>) => void;
  onRemove: (id: string) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onChange,
  onRemove,
}) => {
  return (
    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 space-y-4 relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400">
            {address.label.toLowerCase() === "home" ? (
              <Home size={16} />
            ) : address.label.toLowerCase() === "office" ? (
              <Briefcase size={16} />
            ) : (
              <MapPin size={16} />
            )}
          </div>
          <Input
            value={address.label}
            onChange={(e) => onChange(address._id, { label: e.target.value })}
            placeholder="Label (e.g. Home, Office)"
            className="h-8 w-32 bg-white border-slate-200 rounded-lg text-xs font-bold"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`default-${address._id}`}
              checked={address.isDefault}
              onCheckedChange={(checked) =>
                onChange(address._id, { isDefault: !!checked })
              }
            />
            <Label
              htmlFor={`default-${address._id}`}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer"
            >
              Default
            </Label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50"
            onClick={() => onRemove(address._id)}
          >
            <Trash size={14} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            Address Line 1
          </Label>
          <Input
            value={address.addressLine1}
            onChange={(e) =>
              onChange(address._id, { addressLine1: e.target.value })
            }
            placeholder="Street address, P.O. box"
            className="h-9 bg-white border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            Address Line 2 (Optional)
          </Label>
          <Input
            value={address.addressLine2}
            onChange={(e) =>
              onChange(address._id, { addressLine2: e.target.value })
            }
            placeholder="Apartment, suite, unit, etc."
            className="h-9 bg-white border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            Landmark
          </Label>
          <Input
            value={address.landmark}
            onChange={(e) =>
              onChange(address._id, { landmark: e.target.value })
            }
            placeholder="Near Landmark"
            className="h-9 bg-white border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
              City
            </Label>
            <Input
              value={address.city}
              onChange={(e) => onChange(address._id, { city: e.target.value })}
              placeholder="City"
              className="h-9 bg-white border-slate-200 rounded-xl text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
              Pincode
            </Label>
            <Input
              value={address.pincode}
              onChange={(e) =>
                onChange(address._id, { pincode: e.target.value })
              }
              placeholder="Pincode"
              className="h-9 bg-white border-slate-200 rounded-xl text-sm"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            State
          </Label>
          <Input
            value={address.state}
            onChange={(e) => onChange(address._id, { state: e.target.value })}
            placeholder="State / Province"
            className="h-9 bg-white border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            Country
          </Label>
          <Input
            value={address.country}
            onChange={(e) => onChange(address._id, { country: e.target.value })}
            placeholder="Country"
            className="h-9 bg-white border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>
    </div>
  );
};
