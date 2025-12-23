interface Props {
  onConfirm: () => void;
}

export default function CancelSingleDayForm({ onConfirm }: Props) {
  return (
    <div className="space-y-4">
      <p>
        This will cancel the reservation <strong>for today only</strong>.
      </p>

      <button
        onClick={onConfirm}
        className="w-full bg-yellow-600 text-white py-2 rounded"
      >
        Cancel for today
      </button>
    </div>
  );
}
