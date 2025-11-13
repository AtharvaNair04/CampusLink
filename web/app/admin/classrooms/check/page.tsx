"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  Calendar,
  Clock,
  School,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ClassroomAvailabilityPage() {
  const supabase = supabaseBrowser;

  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<number | "">("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load classrooms
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase
        .from("classrooms")
        .select("id, room_no")
        .order("room_no");
      setClassrooms(data || []);
    };
    fetchRooms();
  }, []);

  const checkAvailability = async () => {
    if (!date || !slot) {
      alert("Select date & slot");
      return;
    }

    setLoading(true);
    const weekday = new Date(date).getDay(); // 0=Sunday
    const mappedWeekday = weekday === 0 ? 7 : weekday;

    let output: any[] = [];

    for (const room of classrooms) {
      // TIMETABLE CHECK
      const { data: tt } = await supabase
        .from("timetable")
        .select("*")
        .eq("classroom_id", room.id)
        .eq("weekday", mappedWeekday)
        .eq("slot", slot)
        .single();

      if (tt) {
        output.push({
          room: room.room_no,
          status: "occupied",
          reason: `CLASS: ${tt.subject} (${tt.faculty_name})`,
        });
        continue;
      }

      // BOOKING CHECK
      const { data: booking } = await supabase
        .from("room_bookings")
        .select("*, teachers(name)")
        .eq("classroom_id", room.id)
        .eq("date", date)
        .eq("slot", slot)
        .eq("status", "Approved")
        .single();

      if (booking) {
        output.push({
          room: room.room_no,
          status: "occupied",
          reason: `BOOKED by ${booking.teachers.name}`,
        });
      } else {
        output.push({
          room: room.room_no,
          status: "free",
          reason: "Available",
        });
      }
    }

    setResults(output);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#8B1538] flex items-center gap-2">
        <School className="w-7 h-7" /> Check Classroom Availability
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Date */}
        <div>
          <label className="text-sm font-medium text-[#8B1538] flex gap-1">
            <Calendar className="w-4 h-4" /> Select Date
          </label>
          <input
            type="date"
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Slot */}
        <div>
          <label className="text-sm font-medium text-[#8B1538] flex gap-1">
            <Clock className="w-4 h-4" /> Select Slot
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={slot}
            onChange={(e) => setSlot(Number(e.target.value))}
          >
            <option value="">-- Choose Slot --</option>
            <option value={1}>Slot 1 (9:00 – 9:50)</option>
            <option value={2}>Slot 2 (9:50 – 10:40)</option>
            <option value={3}>Slot 3 (10:50 – 11:40)</option>
            <option value={4}>Slot 4 (11:40 – 12:30)</option>
          </select>
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button
            onClick={checkAvailability}
            disabled={loading}
            className="w-full bg-[#8B1538] text-white py-2 rounded-md font-semibold hover:bg-[#A01842]"
          >
            {loading ? "Checking..." : "Check Availability"}
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold text-[#8B1538]">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((r) => (
              <div
                key={r.room}
                className={`border rounded-lg p-4 shadow ${
                  r.status === "free"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <h3 className="font-bold text-lg">{r.room}</h3>
                <p className="mt-1 text-sm text-gray-600">{r.reason}</p>

                {r.status === "free" ? (
                  <div className="mt-2 flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" /> Available
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <XCircle className="w-4 h-4" /> Occupied
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
