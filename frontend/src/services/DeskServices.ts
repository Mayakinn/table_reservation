import apiClient from "./apiClient";
import type { DeskAvailability } from "../types/DeskAvailability";

export async function fetchDesks(
  from: string,
  to: string
): Promise<DeskAvailability[]> {
  const res = await apiClient.get("/api/desks", {
    params: { from, to },
  });

  return res.data;
}

export async function reserveDesk(deskId: string, from: string, to: string) {
  await apiClient.post(`/api/desks/${deskId}/reserve`, null, {
    params: { from, to },
  });
}

export async function cancelReservation(reservationId: string) {
  await apiClient.delete(`/api/reservations/${reservationId}`);
}

export async function cancelReservationForDay(
  reservationId: string,
  day: string
) {
  await apiClient.delete(`/api/reservations/${reservationId}/day`, {
    params: { day },
  });
}
