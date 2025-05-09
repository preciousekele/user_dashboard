import { X, Edit, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

const RecordDetailsModal = ({
  record,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef(null);

  // Close modal on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);
  if (!isOpen || !record) return null;

  return (
    <>
      {/* Main Details Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal content */}
        <div
          ref={modalRef}
          className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full shadow-xl"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">
                {record.studentName}
              </h2>
              <p className="text-gray-400">{record.matricNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Record Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Offense</h3>
              <p className="text-lg text-gray-200">{record.offense}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Punishment</h3>
              <p className="text-lg text-gray-200">{record.punishment}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Date</h3>
              <p className="text-lg text-gray-200">{record.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
              <span className=" py-1 text-gray-200 text-lg font-medium">
                {record.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordDetailsModal;
