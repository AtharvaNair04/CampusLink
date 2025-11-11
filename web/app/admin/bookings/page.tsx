"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, CalendarDays } from "lucide-react";

interface BookingRequest {
  id: number;
  teacherName: string;
  room: string;
  date: string;
  time: string;
  purpose: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function BookingRequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: 1,
      teacherName: "Prof. Anoop Kumar",
      room: "CSE Lab 2",
      date: "2025-11-15",
      time: "10:00 - 12:00",
      purpose: "AI Workshop",
      status: "Pending",
    },
    {
      id: 2,
      teacherName: "Dr. Divya R",
      room: "A102",
      date: "2025-11-16",
      time: "2:00 - 4:00",
      purpose: "Faculty Meeting",
      status: "Approved",
    },
  ]);

  const handleAction = (id: number, status: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <CalendarDays className="w-6 h-6" /> Booking Requests
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Teacher Name</th>
              <th className="border p-2">Room</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{r.teacherName}</td>
                <td className="p-2">{r.room}</td>
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.time}</td>
                <td className="p-2">{r.purpose}</td>
                <td
                  className={`p-2 text-center font-medium ${
                    r.status === "Approved"
                      ? "text-green-600"
                      : r.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {r.status}
                </td>
                <td className="p-2 text-center space-x-3">
                  {r.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(r.id, "Approved")}
                        className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(r.id, "Rejected")}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </>
                  )}
                  {r.status !== "Pending" && (
                    <span className="text-gray-500 text-sm">Actioned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
