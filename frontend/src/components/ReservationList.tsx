import type { Reservation } from "../types/Reservation";
import ReservationRow from "./ReservationRow";

interface Props {
  title: string;
  reservations: Reservation[];
  isPast?: boolean;
  onCancelAll?: (id: string) => void;
  onCancelDay?: (id: string) => void;
}

export default function ReservationList({
  title,
  reservations,
  isPast,
  onCancelAll,
  onCancelDay,
}: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-500">No reservations</p>
      ) : (
        <div className="space-y-2">
          {reservations.map((r) => (
            <ReservationRow
              key={r.reservationId}
              reservation={r}
              isPast={isPast}
              onCancelAll={onCancelAll}
              onCancelDay={onCancelDay}
            />
          ))}
        </div>
      )}
    </div>
  );
}
