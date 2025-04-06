import { X, Edit, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordDetailsModal = ({ 
  record, 
  isOpen, 
  onClose,
  onDelete
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setShowDeleteConfirm(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
        setShowDeleteConfirm(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleEdit = () => {
    navigate(`/edit-record/${record.id}`, { state: { record } });
    onClose();
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(record.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  if (!isOpen || !record) return null;

  return (
    <>
      {/* Main Details Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Blur backdrop */}
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

          {/* Details Grid */}
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                record.status === "Resolved" ? "bg-green-500" :
                record.status === "Pending" ? "bg-yellow-500" :
                "bg-blue-500"
              }`}>
                {record.status}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-700 pt-4">
            <button
              onClick={handleDeleteClick}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
              aria-label="Delete record"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
              aria-label="Edit record"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 mb-4 bg-red-900/30 rounded-full">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-300">
                Are you sure you want to permanently delete this record?
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordDetailsModal;