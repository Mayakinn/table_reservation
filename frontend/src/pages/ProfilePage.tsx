import { useEffect, useState } from "react";
import {
  cancelReservation,
  cancelReservationForDay,
} from "../services/DeskServices";

import ReservationList from "../components/ReservationList";
import ReservationModal from "../components/Modal";
import CancelReservationForm from "../forms/CancelReservationForm";
import CancelSingleDayForm from "../forms/CancelSingleDayForm";
import type { Profile } from "../types/Profile";
import { fetchProfile } from "../services/ProfileServices";

type ModalMode = "cancel-all" | "cancel-day" | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchProfile();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const openCancelAll = (id: string) => {
    setSelectedReservationId(id);
    setModalMode("cancel-all");
  };

  const openCancelDay = (id: string) => {
    setSelectedReservationId(id);
    setModalMode("cancel-day");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedReservationId(null);
  };

  if (loading || !profile) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">
        {profile.firstName} {profile.lastName}
      </h1>

      <ReservationList
        title="Current reservations"
        reservations={profile.currentReservations}
        onCancelAll={openCancelAll}
        onCancelDay={openCancelDay}
      />

      <ReservationList
        title="Past reservations"
        reservations={profile.pastReservations}
        isPast
      />

      <ReservationModal
        isOpen={modalMode !== null}
        title={
          modalMode === "cancel-all"
            ? "Cancel Reservation"
            : "Cancel Single Day"
        }
        onClose={closeModal}
      >
        {modalMode === "cancel-all" && selectedReservationId && (
          <CancelReservationForm
            onConfirm={async () => {
              await cancelReservation(selectedReservationId);
              closeModal();
              loadProfile();
            }}
          />
        )}

        {modalMode === "cancel-day" && selectedReservationId && (
          <CancelSingleDayForm
            onConfirm={async () => {
              await cancelReservationForDay(
                selectedReservationId,
                new Date().toISOString().split("T")[0]
              );
              closeModal();
              loadProfile();
            }}
          />
        )}
      </ReservationModal>
    </div>
  );
}
