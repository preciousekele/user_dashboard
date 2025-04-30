import { X, AlertTriangle } from "lucide-react";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 mb-4 bg-red-900/30 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">
            Confirm Deletion
          </h3>
          <p className="text-gray-300 mb-6">
            <span className="font-medium text-white"></span> Are you sure you want to permanently delete this record?
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;