"use client";

import { useState } from "react";
import { PlusCircle, Edit3, Trash2, Building2 } from "lucide-react";

interface Classroom {
  id: number;
  roomNo: string;
  building: string;
  capacity: number;
  status: "Available" | "Occupied";
}

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    { id: 1, roomNo: "A101", building: "Main Block", capacity: 40, status: "Available" },
    { id: 2, roomNo: "A102", building: "Main Block", capacity: 60, status: "Occupied" },
    { id: 3, roomNo: "B203", building: "CSE Block", capacity: 50, status: "Available" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    roomNo: "",
    building: "",
    capacity: "",
    status: "Available",
  });

  const handleAdd = () => {
    if (!newClassroom.roomNo || !newClassroom.building || !newClassroom.capacity) {
      alert("Please fill all fields");
      return;
    }

    const newEntry: Classroom = {
      id: Date.now(),
      roomNo: newClassroom.roomNo,
      building: newClassroom.building,
      capacity: Number(newClassroom.capacity),
      status: newClassroom.status as "Available" | "Occupied",
    };

    setClassrooms([newEntry, ...classrooms]);
    setShowModal(false);
    setNewClassroom({ roomNo: "", building: "", capacity: "", status: "Available" });
  };

  const handleDelete = (id: number) => {
    setClassrooms(classrooms.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <Building2 className="w-6 h-6" /> Classroom Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e]"
        >
          <PlusCircle className="w-5 h-5" /> Add Classroom
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Room No</th>
              <th className="border p-2">Building</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{c.roomNo}</td>
                <td className="p-2">{c.building}</td>
                <td className="p-2">{c.capacity}</td>
                <td
                  className={`p-2 font-medium ${
                    c.status === "Available" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {c.status}
                </td>
                <td className="p-2 text-center space-x-3">
                  <button className="text-blue-600 hover:underline flex items-center gap-1">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Classroom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-[#7c183d]">Add Classroom</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Room Number"
                value={newClassroom.roomNo}
                onChange={(e) => setNewClassroom({ ...newClassroom, roomNo: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
              />
              <input
                type="text"
                placeholder="Building Name"
                value={newClassroom.building}
                onChange={(e) => setNewClassroom({ ...newClassroom, building: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newClassroom.capacity}
                onChange={(e) => setNewClassroom({ ...newClassroom, capacity: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
              />
              <select
                value={newClassroom.status}
                onChange={(e) => setNewClassroom({ ...newClassroom, status: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
