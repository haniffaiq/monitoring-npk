import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import "./Calendar.css";

export default function CalendarComponent() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="calendar-container">
      <div className="calendar-tittle">
        <p>Kalender</p>
      </div>
      <div className="component-container">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} showOutsideDays fixedWeeks />
      </div>
    </div>
  );
}