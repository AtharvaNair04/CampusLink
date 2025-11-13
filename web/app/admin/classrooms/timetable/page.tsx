"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Table, Calendar } from "lucide-react";

export default function TimetablePage() {
  const supabase = supabaseBrowser;

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState("");

  const [timetable, setTimetable] = useState<any[]>([]);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slotLabels: Record<number, string> = {
    1: "9:00–9:50",
    2: "9:50–10:40",
    3: "10:50–11:40",
    4: "11:40–12:30",
};

  useEffect(() => {
    const loadSections = async () => {
      const { data } = await supabase
        .from("timetable")
        .select("section")
        .order("section");

      const uniqueSections = [
        ...new Set((data || []).map((t: any) => t.section)),
      ];

      setSections(uniqueSections);
      if (uniqueSections.length > 0) setSelectedSection(uniqueSections[0]);
    };

    loadSections();
  }, []);

  useEffect(() => {
    if (selectedSection) loadTimetable();
  }, [selectedSection]);

  const loadTimetable = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("timetable")
      .select("*, classrooms(room_no)")
      .eq("section", selectedSection)
      .order("weekday")
      .order("slot");

    setTimetable(data || []);
    setLoading(false);
  };

  const getCell = (weekday: number, slot: number) => {
    const entry = timetable.find(
      (t: any) => t.weekday === weekday && t.slot === slot
    );
    if (!entry) return null;

    return (
      <div className="p-2 rounded-lg bg-[#F5E6D3]/40 border border-[#8B1538]/20">
        <p className="font-semibold text-[#8B1538]">{entry.subject}</p>
        <p className="text-sm text-[#8B1538]/70">
          Room: {entry.classrooms?.room_no}
        </p>
        <p className="text-xs text-gray-500">
          Faculty: {entry.faculty_name || "—"}
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#8B1538] flex items-center gap-2">
        <Table className="w-7 h-7" />
        Weekly Timetable
      </h1>

      {/* section selector */}
      <div className="bg-white p-4 rounded-xl shadow border border-[#8B1538]/20">
        <label className="text-[#8B1538] font-medium flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Select Section
        </label>
        <select
          className="mt-2 w-full border px-3 py-2 rounded-md"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* timetable grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#8B1538] text-white">
              <th className="p-3">Slot</th>
              {weekdays.map((d) => (
                <th key={d} className="p-3 text-center">
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4].map((slot) => (
              <tr key={slot} className="border">
                <td className="p-3 font-semibold text-[#8B1538] bg-[#F5E6D3]/60">
                  {slot} <br />
                  <span className="text-xs">{slotLabels[slot]}</span>
                </td>

                {weekdays.map((_, index) => (
                  <td key={index} className="p-2 align-top">
                    {getCell(index + 1, slot) || (
                      <p className="text-gray-400 text-sm">—</p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
