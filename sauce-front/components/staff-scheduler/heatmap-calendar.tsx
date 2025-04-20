"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeatmapCalendar() {
  const [week, setWeek] = useState("current");
  const [view, setView] = useState("week");

  const days = [
    "Monday (Closed)",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
  ];

  // Generate demand levels with Monday set to 0
  const demandLevels = Array.from({ length: days.length }, (_, dayIndex) =>
    Array.from({ length: hours.length }, () =>
      dayIndex === 0 ? 0 : Math.floor(Math.random() * 100)
    )
  );

  // Function to get color based on demand level
  const getDemandColor = (level: number, isMonday: boolean) => {
    if (isMonday) return "bg-gray-100";
    if (level < 30) return "bg-green-100";
    if (level < 60) return "bg-yellow-100";
    if (level < 80) return "bg-orange-100";
    return "bg-red-100";
  };

  // Function to get text color based on demand level
  const getDemandTextColor = (level: number, isMonday: boolean) => {
    if (isMonday) return "text-gray-500";
    if (level < 30) return "text-green-800";
    if (level < 60) return "text-yellow-800";
    if (level < 80) return "text-orange-800";
    return "text-red-800";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={week} onValueChange={setWeek}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous Week</SelectItem>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
              <SelectItem value="future">Two Weeks Ahead</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[100px_repeat(7,1fr)]">
            <div className="p-2 font-medium text-center">Hours</div>
            {days.map((day) => (
              <div key={day} className="p-2 font-medium text-center">
                {day}
              </div>
            ))}
          </div>
          {hours.map((hour, hourIndex) => (
            <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)]">
              <div className="p-2 border text-center">{hour}</div>
              {days.map((day, dayIndex) => {
                const demandLevel = demandLevels[dayIndex][hourIndex];
                const isMonday = dayIndex === 0;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`p-2 border text-center ${getDemandColor(
                      demandLevel,
                      isMonday
                    )}`}
                  >
                    <span
                      className={`font-medium ${getDemandTextColor(
                        demandLevel,
                        isMonday
                      )}`}
                    >
                      {isMonday ? "Closed" : demandLevel}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <span className="text-sm">Closed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span className="text-sm">Low (0-30)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 rounded"></div>
          <span className="text-sm">Medium (30-60)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 rounded"></div>
          <span className="text-sm">High (60-80)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span className="text-sm">Peak (80-100)</span>
        </div>
      </div>
    </div>
  );
}
