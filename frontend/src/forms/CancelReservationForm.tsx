interface Props {
  onConfirm: () => void;
}

export default function CancelReservationForm({ onConfirm }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-red-600">
        Are you sure you want to cancel the entire reservation?
      </p>

      <button
        onClick={onConfirm}
        className="w-full bg-red-600 text-white py-2 rounded"
      >
        Cancel reservation
      </button>
    </div>
  );
}
