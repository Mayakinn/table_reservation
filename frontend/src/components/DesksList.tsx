import DeskCard from "./DeskCard";
import type { DeskAvailability } from "../types/DeskAvailability";

interface Props {
  desks: DeskAvailability[];
  onReserveClick: (deskId: string) => void;
  onCancelAllClick: (reservationId: string) => void;
  onCancelDayClick: (reservationId: string) => void;
}

export default function DesksList({
  desks,
  onReserveClick,
  onCancelAllClick,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {desks.map((desk) => (
        <DeskCard
          key={desk.deskId}
          desk={desk}
          onReserveClick={onReserveClick}
          onCancelAllClick={onCancelAllClick}
        />
      ))}
    </div>
  );
}
