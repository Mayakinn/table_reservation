import type { DeskAvailability } from "../types/DeskAvailability";

interface Props {
  desk: DeskAvailability;
  onReserveClick: (deskId: string) => void;
  onCancelAllClick: (reservationId: string) => void;
}

export default function DeskCard({
  desk,
  onReserveClick,
  onCancelAllClick,
}: Props) {
  return (
    <div
      className={`group border rounded-3xl p-4 ${
        desk.status === "Open"
          ? "bg-green-100 border-green-700"
          : desk.status === "Reserved"
          ? "bg-red-100 border-red-700"
          : "bg-gray-200 border-gray-700"
      }`}
    >
      <div className="font-semibold">Desk #{desk.deskNumber}</div>

      <div className="text-sm mt-1">{desk.status}</div>

      {desk.status === "Reserved" && desk.reservedBy && (
        <div className="hidden group-hover:block text-xs mt-2">
          Reserved by <strong>{desk.reservedBy}</strong>
        </div>
      )}

      {desk.status === "Maintenance" && desk.maintenanceMessage && (
        <div className="hidden group-hover:block text-xs mt-2">
          {desk.maintenanceMessage}
        </div>
      )}

      {desk.status === "Open" && (
        <button
          className="mt-3 w-full bg-green-800 text-white py-1 rounded"
          onClick={() => onReserveClick(desk.deskId)}
        >
          Reserve
        </button>
      )}

      {desk.status === "Reserved" &&
        desk.isReservedByCurrentUser &&
        desk.reservationId && (
          <button
            onClick={() => {
              if (!desk.reservationId) return;
              onCancelAllClick(desk.reservationId);
            }}
            className="mt-3 w-full bg-red-800 text-white  py-1 rounded"
          >
            Cancel reservation
          </button>
        )}
    </div>
  );
}
