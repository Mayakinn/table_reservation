import type { Reservation } from "../types/Reservation";

interface Props {
  reservation: Reservation;
  isPast?: boolean;
  onCancelAll?: (id: string) => void;
  onCancelDay?: (id: string) => void;
}

export default function ReservationRow({
  reservation,
  isPast,
  onCancelAll,
  onCancelDay,
}: Props) {
  const today = new Date().toISOString().split("T")[0];

  const startDate = reservation.startDate.split("T")[0];
  const endDate = reservation.endDate.split("T")[0];

  const isActiveToday = startDate <= today && today <= endDate;

  const isSingleDayReservation = startDate === endDate;

  const canCancelToday = isActiveToday && !isSingleDayReservation;

  return (
    <div className="border rounded p-3 flex justify-between items-center">
      <div>
        <div className="font-medium">Desk #{reservation.deskNumber}</div>
        <div className="text-sm text-gray-600">
          {reservation.startDate.split("T")[0]} -{">"}{" "}
          {reservation.endDate.split("T")[0]}
        </div>
      </div>

      {!isPast && (
        <div className="flex gap-2">
          {canCancelToday && (
            <button
              onClick={() => onCancelDay?.(reservation.reservationId)}
              className="bg-yellow-600 text-white px-3 py-1 text-sm rounded"
            >
              Cancel today
            </button>
          )}

          <button
            onClick={() => onCancelAll?.(reservation.reservationId)}
            className="bg-red-600 text-white px-3 py-1 text-sm rounded"
          >
            Cancel reservation
          </button>
        </div>
      )}
    </div>
  );
}
