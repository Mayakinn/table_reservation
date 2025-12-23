interface Props {
  from: string;
  to: string;
  onConfirm: () => void;
}

export default function CreateReservationForm({ from, to, onConfirm }: Props) {
  return (
    <div className="space-y-4">
      <p>
        Reserve desk for:
        <br />
        <strong>{from}</strong> -{">"} <strong>{to}</strong>
      </p>

      <button
        onClick={onConfirm}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Confirm reservation
      </button>
    </div>
  );
}
