import type { Reservation } from "./Reservation";

export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  currentReservations: Reservation[];
  pastReservations: Reservation[];
}
