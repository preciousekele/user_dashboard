import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";
import RecordDetailsModal from "./RecordDetailsModal";

const MOCK_RECORDS = [
  {
    id: 1,
    studentName: "John Doe",
    matricNumber: "20000000001",
    offense: "Theft",
    punishment: "1 semester suspension",
    date: "2025-03-15",
    status: "Resolved",
  },
  {
    id: 2,
    studentName: "Sarah James",
    matricNumber: "20000000002",
    offense: "Vandalization of Amenity",
    punishment: "Community service",
    date: "2025-03-12",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Michael Smith",
    matricNumber: "20000000003",
    offense: "Drug Abuse",
    punishment: "Expulsion",
    date: "2025-03-10",
    status: "Resolved",
  },
  {
    id: 4,
    studentName: "Deborah Ade",
    matricNumber: "20000000004",
    offense: "Unauthorized Use of School Property",
    punishment: "Community service",
    date: "2025-03-08",
    status: "Under Review",
  },
];

const RecordsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(MOCK_RECORDS);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    recordId: null,
    recordName: ""
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = MOCK_RECORDS.filter(
      (record) =>
        record.studentName.toLowerCase().includes(term) ||
        record.matricNumber.toLowerCase().includes(term) ||
        record.offense.toLowerCase().includes(term) ||
        record.status.toLowerCase().includes(term) ||
        record.matricNumber.toString().includes(term)
    );
    setFilteredRecords(filtered);
  };

  const handleDelete = (recordId) => {
    setFilteredRecords(prev => prev.filter(record => record.id !== recordId));
    setDeleteModal({ isOpen: false, recordId: null, recordName: "" });
    setSelectedRecord(null);
  };

  const confirmDelete = (record, e) => {
    e.stopPropagation();
    setDeleteModal({
      isOpen: true,
      recordId: record.id,
      recordName: `${record.studentName} (${record.matricNumber})`
    });
  };

  const handleRowClick = (record) => {
    setSelectedRecord(record);
  };

  const handleEditClick = (record, e) => {
    e.stopPropagation();
    navigate("/edit-record/:id", { state: { record } });
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
  <h2 className="text-xl font-semibold text-gray-100 whitespace-nowrap">
    Disciplinary Records
  </h2>
  <div className="relative w-full sm:w-auto min-w-[200px]">
    <input
      type="text"
      placeholder="Search..."
      className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleSearch}
      value={searchTerm}
    />
    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
  </div>
</div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Matric Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Offense
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Punishment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredRecords.map((record) => (
              <motion.tr
                key={record.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleRowClick(record)}
                className="cursor-pointer hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {record.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {record.matricNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {record.offense}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {record.punishment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === "Resolved"
                        ? "bg-green-500 text-white"
                        : record.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-indigo-400 hover:text-indigo-300"
                      onClick={(e) => handleEditClick(record, e)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={(e) => confirmDelete(record, e)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, recordId: null, recordName: "" })}
        onConfirm={() => handleDelete(deleteModal.recordId)}
        recordName={deleteModal.recordName}
      />

      <RecordDetailsModal
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        onDelete={handleDelete}
      />
    </motion.div>
  );
};

export default RecordsTable;