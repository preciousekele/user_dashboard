import { X, Edit, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userService";

const UserDetailsModal = ({
  user,
  isOpen,
  onClose,
  onDelete, // Parent passes this to refresh UI
}) => {
  useEffect(() => {
    if (user) {
      console.log("User object received:", user);
      console.log("createdAt value:", user.createdAt);
    }
  }, [user]);
  
  const navigate = useNavigate();
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

  // Navigate to Edit form
  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`, { state: { user } });
    onClose(); // Close modal after navigating
  };

  // Confirm and process deletion
  const confirmDelete = async () => {
    if (!window.confirm("ARE YOU SURE YOU WANT TO PERMANENTLY DELETE THIS USER?")) {
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }
  
      const response = await deleteUser(user.id, token);
      console.log("Delete response:", response);
  
      // Call the onDelete callback with the deleted user's ID
      if (onDelete) {
        onDelete(user.id);
      }
      
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting user:", error);
      // You might want to show an error message to the user here
    }
  };

  // Format date for readable display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isOpen || !user) return null;

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
              <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
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
              <h3 className="text-sm font-medium text-gray-400">Role</h3>
              <p className="text-sm text-gray-200">
                {user.role.charAt(0).toUpperCase() +
                  user.role.slice(1).toLowerCase()}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400">Account Created on</h3>
              <p className="text-sm text-gray-200">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-700 pt-4">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
              aria-label="Edit record"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={confirmDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
              aria-label="Delete record"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModal;