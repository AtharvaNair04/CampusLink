"use client";

import { useState } from "react";
import { FileText, Trash2, Download, Eye, X } from "lucide-react";

interface Document {
  id: number;
  name: string;
  category: string;
  date: string;
  type: string;
  fileType: "pdf" | "image";
  fileUrl: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "AcademicCalendar2025.pdf",
      category: "Academics",
      type: "Circular",
      date: "2025-11-11",
      fileType: "pdf",
      fileUrl: "/sample-pdf.pdf", // 🔸 placeholder
    },
    {
      id: 2,
      name: "ConferencePoster.png",
      category: "Events",
      type: "Event",
      date: "2025-11-10",
      fileType: "image",
      fileUrl: "https://via.placeholder.com/600x400.png",
    },
    {
      id: 3,
      name: "StaffMeetingNotice.pdf",
      category: "Administration",
      type: "Notice",
      date: "2025-11-09",
      fileType: "pdf",
      fileUrl: "/sample-pdf.pdf",
    },
  ]);

  const [filter, setFilter] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleDelete = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const filteredDocs = filter
    ? documents.filter((doc) => doc.category === filter)
    : documents;

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <FileText className="w-6 h-6" /> Document Repository
        </h1>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
        >
          <option value="">All Categories</option>
          <option value="Academics">Academics</option>
          <option value="Events">Events</option>
          <option value="Administration">Administration</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow p-4">
        {filteredDocs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No documents found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Document Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Uploaded On</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{doc.name}</td>
                  <td className="p-2">{doc.category}</td>
                  <td className="p-2">{doc.type}</td>
                  <td className="p-2">{doc.date}</td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                      className="text-green-600 hover:underline flex items-center gap-1"
                      onClick={() => window.open(doc.fileUrl, "_blank")}
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[700px] p-4 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-3 text-[#7c183d] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {selectedDoc.name}
            </h2>

            {/* File preview */}
            <div className="border rounded-md p-3 bg-gray-50">
              {selectedDoc.fileType === "pdf" ? (
                <iframe
                  src={selectedDoc.fileUrl}
                  className="w-full h-[500px] rounded-md"
                  title={selectedDoc.name}
                ></iframe>
              ) : (
                <img
                  src={selectedDoc.fileUrl}
                  alt={selectedDoc.name}
                  className="w-full h-[500px] object-contain rounded-md"
                />
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.open(selectedDoc.fileUrl, "_blank")}
                className="px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e]"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
