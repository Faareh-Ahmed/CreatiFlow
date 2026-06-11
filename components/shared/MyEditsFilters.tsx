"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const MyEditsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOrder = searchParams.get("sortOrder") || "recent";
  const actionFilter = searchParams.get("actionFilter") || "all";

  const onSortChange = (value: string) => {
    let newUrl = "";
    if (value && value !== "recent") {
      newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "sortOrder",
        value,
      });
    } else {
      newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["sortOrder"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  const onFilterChange = (value: string) => {
    let newUrl = "";
    if (value && value !== "all") {
      newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "actionFilter",
        value,
      });
    } else {
      newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["actionFilter"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <Select onValueChange={onSortChange} value={sortOrder}>
        <SelectTrigger className="w-[140px] px-4 py-3 bg-surface-container rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors border-none shadow-none h-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <SelectValue placeholder="Date" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Recent</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onFilterChange} value={actionFilter}>
        <SelectTrigger className="w-[180px] px-4 py-3 bg-surface-container rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors border-none shadow-none h-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <SelectValue placeholder="Tools" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tools</SelectItem>
          <SelectItem value="restore">Image Restore</SelectItem>
          <SelectItem value="fill">Generative Fill</SelectItem>
          <SelectItem value="remove">Object Remove</SelectItem>
          <SelectItem value="recolor">Object Recolor</SelectItem>
          <SelectItem value="removeBackground">Background Remove</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
