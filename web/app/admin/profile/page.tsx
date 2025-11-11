"use client";

import { useState } from "react";
import { UserCog, Edit3, Save, Camera } from "lucide-react";

export default function AdminProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    officeName: "CSE Office",
    department: "Computer Science and Engineering",
    campus: "Amrita Vishwa Vidyapeetham - Coimbatore Campus",
    adminName: "Dr. Karthik Kishor",
    email: "cseoffice@amrita.edu",
    phone: "+91 9876543210",
    joinedDate: "2023-07-01",
    role: "Department Admin",
    profileImage: "/default-avatar.png", // you can put a file in public/
  });

  const handleSave = () => {
    setEditMode(false);
    alert("Profile details updated successfully! (Mock Save)");
  };

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <UserCog className="w-6 h-6" /> Admin Profile
        </h1>
        <button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            editMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-[#7c183d] text-white hover:bg-[#61122e]"
          }`}
        >
          {editMode ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-8">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-[#7c183d]"
          />
          <label
            htmlFor="profile-photo"
            className="absolute bottom-2 right-2 bg-[#7c183d] p-2 rounded-full text-white cursor-pointer hover:bg-[#61122e]"
          >
            <Camera className="w-4 h-4" />
          </label>
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Office Name</label>
              <input
                type="text"
                value={profile.officeName}
                disabled={!editMode}
                onChange={(e) => handleChange("officeName", e.target.value)}
                className={`w-full border rounded-md px-3 py-2 ${
                  editMode
                    ? "focus:ring-2 focus:ring-[#7c183d]"
                    : "bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Department</label>
              <input
                type="text"
                value={profile.department}
                disabled={!editMode}
                onChange={(e) => handleChange("department", e.target.value)}
                className={`w-full border rounded-md px-3 py-2 ${
                  editMode
                    ? "focus:ring-2 focus:ring-[#7c183d]"
                    : "bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Campus</label>
            <input
              type="text"
              value={profile.campus}
              disabled={!editMode}
              onChange={(e) => handleChange("campus", e.target.value)}
              className={`w-full border rounded-md px-3 py-2 ${
                editMode
                  ? "focus:ring-2 focus:ring-[#7c183d]"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Admin Name</label>
              <input
                type="text"
                value={profile.adminName}
                disabled={!editMode}
                onChange={(e) => handleChange("adminName", e.target.value)}
                className={`w-full border rounded-md px-3 py-2 ${
                  editMode
                    ? "focus:ring-2 focus:ring-[#7c183d]"
                    : "bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled={!editMode}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full border rounded-md px-3 py-2 ${
                  editMode
                    ? "focus:ring-2 focus:ring-[#7c183d]"
                    : "bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Contact Number</label>
              <input
                type="text"
                value={profile.phone}
                disabled={!editMode}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`w-full border rounded-md px-3 py-2 ${
                  editMode
                    ? "focus:ring-2 focus:ring-[#7c183d]"
                    : "bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Joined Date</label>
              <input
                type="date"
                value={profile.joinedDate}
                disabled
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
