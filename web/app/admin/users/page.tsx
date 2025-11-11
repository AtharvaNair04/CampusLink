"use client";

import { useState } from "react";
import { UserPlus, Trash2, ToggleLeft, ToggleRight, UserCog } from "lucide-react";

interface Student {
  id: number;
  rollno: string;
  name: string;
  branch: string;
  email: string;
  status: "Active" | "Inactive";
}

interface Teacher {
  id: number;
  tid: string;
  name: string;
  branch: string;
  email: string;
  status: "Active" | "Inactive";
}

export default function UsersPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, rollno: "CB.EN.U4CSE22101", name: "Kiran Raj", branch: "CSE", email: "kiran@amrita.edu", status: "Active" },
    { id: 2, rollno: "CB.EN.U4ECE22102", name: "Megha S", branch: "ECE", email: "megha@amrita.edu", status: "Inactive" },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, tid: "T101", name: "Anoop Kumar", branch: "CSE", email: "anoop@amrita.edu", status: "Active" },
    { id: 2, tid: "T102", name: "Divya R", branch: "ECE", email: "divya@amrita.edu", status: "Active" },
  ]);

  const [filter, setFilter] = useState<"Students" | "Teachers">("Students");
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    branch: "",
    email: "",
  });

  const handleAdd = () => {
    if (!newUser.id || !newUser.name || !newUser.branch || !newUser.email) {
      alert("Please fill all fields");
      return;
    }

    if (filter === "Students") {
      const newStudent: Student = {
        id: Date.now(),
        rollno: newUser.id,
        name: newUser.name,
        branch: newUser.branch,
        email: newUser.email,
        status: "Active",
      };
      setStudents([newStudent, ...students]);
    } else {
      const newTeacher: Teacher = {
        id: Date.now(),
        tid: newUser.id,
        name: newUser.name,
        branch: newUser.branch,
        email: newUser.email,
        status: "Active",
      };
      setTeachers([newTeacher, ...teachers]);
    }

    setNewUser({ id: "", name: "", branch: "", email: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (filter === "Students") {
      setStudents(students.filter((s) => s.id !== id));
    } else {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    if (filter === "Students") {
      setStudents(
        students.map((s) =>
          s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
        )
      );
    } else {
      setTeachers(
        teachers.map((t) =>
          t.id === id ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" } : t
        )
      );
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <UserCog className="w-6 h-6" /> User Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7c183d] text-white rounded-md hover:bg-[#61122e]"
        >
          <UserPlus className="w-5 h-5" /> Add {filter.slice(0, -1)}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {["Students", "Teachers"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "Students" | "Teachers")}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === type
                ? "bg-[#7c183d] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              {filter === "Students" ? (
                <>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Branch</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2 text-center">Status</th>
                  <th className="border p-2 text-center">Actions</th>
                </>
              ) : (
                <>
                  <th className="border p-2">Teacher ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Branch</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2 text-center">Status</th>
                  <th className="border p-2 text-center">Actions</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {filter === "Students" &&
              students.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{s.rollno}</td>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.branch}</td>
                  <td className="p-2">{s.email}</td>
                  <td
                    className={`p-2 text-center font-medium ${
                      s.status === "Active" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {s.status}
                  </td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className="text-gray-700 hover:text-[#7c183d]"
                    >
                      {s.status === "Active" ? (
                        <ToggleRight className="w-5 h-5 inline" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 inline" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}

            {filter === "Teachers" &&
              teachers.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{t.tid}</td>
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.branch}</td>
                  <td className="p-2">{t.email}</td>
                  <td
                    className={`p-2 text-center font-medium ${
                      t.status === "Active" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.status}
                  </td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => toggleStatus(t.id)}
                      className="text-gray-700 hover:text-[#7c183d]"
                    >
                      {t.status === "Active" ? (
                        <ToggleRight className="w-5 h-5 inline" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 inline" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-[#7c183d]">
              Add New {filter === "Students" ? "Student" : "Teacher"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {filter === "Students" ? "Roll Number" : "Teacher ID"}
                </label>
                <input
                  type="text"
                  value={newUser.id}
                  onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
                  placeholder={`Enter ${filter === "Students" ? "roll number" : "teacher ID"}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                  type="text"
                  value={newUser.branch}
                  onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
                  placeholder="e.g. CSE, ECE, EEE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7c183d]"
                  placeholder="Enter email address"
                />
              </div>

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
