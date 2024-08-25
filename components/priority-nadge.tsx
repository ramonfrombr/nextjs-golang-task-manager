"use client";
import { Priority } from "@prisma/client";

const PriorityBadge = ({ priority }: { priority: string }) => {
  return (
    <span className="border px-1 py-[2px] rounded-[4px] font-semibold text-xs text-white bg-slate-600">
      {priority.toLocaleLowerCase()}
    </span>
  );
};
export default PriorityBadge;
