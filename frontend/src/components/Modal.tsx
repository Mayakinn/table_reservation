interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ReservationModal({
  isOpen,
  title,
  onClose,
  children,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
