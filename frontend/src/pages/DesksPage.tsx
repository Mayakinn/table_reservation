import { useEffect, useState } from "react";
import type { DeskAvailability } from "../types/DeskAvailability";
import {
  cancelReservation,
  cancelReservationForDay,
  fetchDesks,
  reserveDesk,
} from "../services/DeskServices";

import DesksList from "../components/DesksList";
import ReservationModal from "../components/Modal";
import CreateReservationForm from "../forms/CreateReservationForm";
import CancelReservationForm from "../forms/CancelReservationForm";
import CancelSingleDayForm from "../forms/CancelSingleDayForm";

type ModalMode = "create" | "cancel-all" | "cancel-day" | null;

export default function SharedDesksPage() {
  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const isDateRangeInvalid = from < today || to < from;
  const [desks, setDesks] = useState<DeskAvailability[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);

  const loadDesks = async () => {
    setLoading(true);
    try {
      const data = await fetchDesks(from, to);
      setDesks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesks();
  }, []);

  const openCreateModal = (deskId: string) => {
    setSelectedDeskId(deskId);
    setModalMode("create");
  };

  const openCancelAllModal = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setModalMode("cancel-all");
  };

  const openCancelDayModal = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setModalMode("cancel-day");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedDeskId(null);
    setSelectedReservationId(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Shared Desks</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={from}
            min={today}
            onChange={(e) => {
              const newFrom = e.target.value;
              setFrom(newFrom);

              if (to < newFrom) {
                setTo(newFrom);
              }
            }}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={to}
            min={from < today ? today : from}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={loadDesks}
          disabled={from < today || to < from}
          className="self-end bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Apply
        </button>
      </div>
      {isDateRangeInvalid && (
        <div className="text-red-600 text-sm mb-4">
          Dates are invalid. Please select a valid date range.
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DesksList
          desks={desks}
          onReserveClick={openCreateModal}
          onCancelAllClick={openCancelAllModal}
          onCancelDayClick={openCancelDayModal}
        />
      )}

      {/* Modal */}
      <ReservationModal
        isOpen={modalMode !== null}
        title={
          modalMode === "create"
            ? "Reserve Desk"
            : modalMode === "cancel-all"
            ? "Cancel Reservation"
            : "Cancel Single Day"
        }
        onClose={closeModal}
      >
        {modalMode === "create" && selectedDeskId && (
          <CreateReservationForm
            from={from}
            to={to}
            onConfirm={async () => {
              await reserveDesk(selectedDeskId, from, to);
              closeModal();
              loadDesks();
            }}
          />
        )}

        {modalMode === "cancel-all" && selectedReservationId && (
          <CancelReservationForm
            onConfirm={async () => {
              await cancelReservation(selectedReservationId);
              closeModal();
              loadDesks();
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
              loadDesks();
            }}
          />
        )}
      </ReservationModal>
    </div>
  );
}
