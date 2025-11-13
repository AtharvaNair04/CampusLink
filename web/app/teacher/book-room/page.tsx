"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useSupabase } from "@/components/supabase-provider";
import { Calendar, Clock, School, Send } from "lucide-react";

export default function TeacherBookRoom() {
  const supabase = supabaseBrowser;
  const { session } = useSupabase();

  const [teacherId, setTeacherId] = useState("");
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<number | "">("");
  const [purpose, setPurpose] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Teacher ID from email
  useEffect(() => {
    const loadTeacher = async () => {
      if (!session?.user?.email) return;

      const { data } = await supabase
        .from("teachers")
        .select("id")
        .eq("email", session.user.email)
        .single();

      if (data) setTeacherId(data.id);
    };
    loadTeacher();
  }, [session]);

  // Fetch classrooms
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

  const submitBooking = async () => {
    if (!teacherId || !classroomId || !date || !slot || !purpose) {
      alert("Fill all fields");
      return;
    }

    const weekday = new Date(date).getDay();
    const mappedWeekday = weekday === 0 ? 7 : weekday;

    setLoading(true);

    const { error } = await supabase.from("room_bookings").insert({
      teacher_id: teacherId,
      classroom_id: classroomId,
      date,
      weekday: mappedWeekday,
      slot,
      purpose,
      status: "Pending",
    });

    setLoading(false);

    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      alert("Booking request submitted!");
      setClassroomId("");
      setDate("");
      setSlot("");
      setPurpose("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#8B1538] flex items-center gap-2">
        <School className="w-7 h-7" /> Book a Classroom
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-5 max-w-lg">
        {/* Classroom */}
        <div>
          <label className="text-sm font-medium text-[#8B1538] flex gap-1">
            <School className="w-4 h-4" /> Classroom
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
          >
            <option value="">-- choose classroom --</option>
            {classrooms.map((c) => (
              <option key={c.id} value={c.id}>
                {c.room_no}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-[#8B1538] flex gap-1">
            <Calendar className="w-4 h-4" /> Date
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
            <Clock className="w-4 h-4" /> Slot
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={slot}
            onChange={(e) => setSlot(Number(e.target.value))}
          >
            <option value="">-- choose slot --</option>
            <option value={1}>Slot 1 (9:00 – 9:50)</option>
            <option value={2}>Slot 2 (9:50 – 10:40)</option>
            <option value={3}>Slot 3 (10:50 – 11:40)</option>
            <option value={4}>Slot 4 (11:40 – 12:30)</option>
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="text-sm font-medium text-[#8B1538]">Purpose</label>
          <textarea
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter reason"
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitBooking}
          disabled={loading}
          className="w-full bg-[#8B1538] text-white py-2 rounded-md font-semibold hover:bg-[#A01842] flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
