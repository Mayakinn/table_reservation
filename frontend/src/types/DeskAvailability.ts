import type { DeskStatus } from "./DeskStatus";

export interface DeskAvailability {
  deskId: string;
  deskNumber: number;
  status: DeskStatus;
  reservedBy?: string | null;
  isReservedByCurrentUser: boolean;
  maintenanceMessage?: string | null;
  reservationId?: string | null;
}
