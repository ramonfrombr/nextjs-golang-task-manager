import { Status } from "@prisma/client";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`'border px-1 py-[2px] rounded-[4px] font-semibold text-xs text-white ${
        status == Status.NEW
          ? "bg-yellow-500"
          : status == Status.IN_PROGRESS
          ? "bg-blue-500"
          : status == Status.COMPLETED
          ? "bg-green-500"
          : ""
      }`}
    >
      {status.toLocaleLowerCase().replace("_", " ")}
    </span>
  );
};
export default StatusBadge;
