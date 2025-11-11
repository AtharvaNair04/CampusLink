"use client";

import { useState } from "react";
import { Bell, PlusCircle, Trash2, X } from "lucide-react";

type AlertItem = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: string;
  fromDate?: string;
  toDate?: string;
  file?: File | null;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      title: "Maintenance Notice",
      message: "Server maintenance scheduled for Nov 15, 10 PM - 12 AM.",
      date: "2025-11-10",
      type: "Circular",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState<{
    title: string;
    message: string;
    type: string;
    file: File | null;
    fromDate: string;
    toDate: string;
  }>({
    title: "",
    message: "",
    type: "Alert",
    file: null,
    fromDate: "",
    toDate: "",
  });

  const handleDelete = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        alert("Please select a valid PDF file.");
        e.currentTarget.value = "";
        setNewAlert((s) => ({ ...s, file: null }));
        return;
      }
      setNewAlert((s) => ({ ...s, file }));
    } else {
      setNewAlert((s) => ({ ...s, file: null }));
    }
  };

  const handleAddAlert = () => {
    if (!newAlert.title.trim() || !newAlert.message.trim()) {
      alert("Please enter both title and description.");
      return;
    }

    // if type is Event, require from/to dates
    if (newAlert.type === "Event" && (!newAlert.fromDate || !newAlert.toDate)) {
      alert("Please specify both start and end dates for the event.");
      return;
    }

    const newEntry: AlertItem = {
      id: Date.now(),
      title: newAlert.title.trim(),
      message: newAlert.message.trim(),
      date: new Date().toISOString().slice(0, 10),
      type: newAlert.type,
      file: newAlert.file,
      fromDate: newAlert.fromDate,
      toDate: newAlert.toDate,
    };

    setAlerts((prev) => [newEntry, ...prev]);
    setNewAlert({
      title: "",
      message: "",
      type: "Alert",
      file: null,
      fromDate: "",
      toDate: "",
    });
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <Bell className="w-6 h-6" /> Alerts, Circulars & Events
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e] transition"
        >
          <PlusCircle className="w-5 h-5" /> New Alert
        </button>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow p-4">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No alerts or circulars available.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:shadow-sm bg-[#fff9f8]"
              >
                <div>
                  <h2 className="text-lg font-semibold text-[#7c183d]">{alert.title}</h2>
                  <p className="text-gray-700">{alert.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 Posted: {alert.date} | Type:{" "}
                    <span className="font-medium">{alert.type}</span>
                  </p>
                  {alert.type === "Event" && (
                    <p className="text-sm text-blue-600 mt-1">
                      🗓 Event Dates: {alert.fromDate} → {alert.toDate}
                    </p>
                  )}
                  {alert.file && (
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-blue-600 underline text-sm mt-2 block"
                    >
                      📎 {alert.file.name}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(alert.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for new alert */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[600px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-[#7c183d]">
              Create New Alert / Circular / Event
            </h2>

            <div className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newAlert.type}
                  onChange={(e) =>
                    setNewAlert((s) => ({
                      ...s,
                      type: e.target.value,
                      fromDate: "",
                      toDate: "",
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
                >
                  <option value="Alert">Alert</option>
                  <option value="Circular">Circular</option>
                  <option value="Notice">Notice</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              {/* Event dates only if type = Event */}
              {newAlert.type === "Event" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={newAlert.fromDate}
                      onChange={(e) =>
                        setNewAlert((s) => ({ ...s, fromDate: e.target.value }))
                      }
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={newAlert.toDate}
                      onChange={(e) =>
                        setNewAlert((s) => ({ ...s, toDate: e.target.value }))
                      }
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) =>
                    setNewAlert((s) => ({ ...s, title: e.target.value }))
                  }
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
                  placeholder="Enter title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newAlert.message}
                  onChange={(e) =>
                    setNewAlert((s) => ({ ...s, message: e.target.value }))
                  }
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c183d]"
                  rows={4}
                  placeholder="Enter details"
                ></textarea>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attach PDF (optional)
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="pdf-upload"
                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">Choose PDF</span>
                  </label>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex-1">
                    {newAlert.file ? (
                      <div className="text-sm text-green-700">{newAlert.file.name}</div>
                    ) : (
                      <div className="text-sm text-gray-500">No file selected</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewAlert({
                      title: "",
                      message: "",
                      type: "Alert",
                      file: null,
                      fromDate: "",
                      toDate: "",
                    });
                  }}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAlert}
                  className="px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e]"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
