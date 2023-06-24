import React, { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import { format, isSameDay, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import { getDatabase, ref, onValue } from "firebase/database";

import "react-day-picker/dist/style.css";
import "./Calendar.css";

const database = getDatabase();

function ProgressBar({ label, value, color1, color2 }) {
  const maxValue = 100; // Nilai maksimum untuk nilai perentase
  const roundedValue = Math.round(value / 6) * 6;
  // Menghitung nilai perentase yang tidak lebih besar dari nilai maksimum
  const percentage = value > maxValue ? maxValue : value;
  return (
    <div>
      <p className="mb-1 text-lg font-medium text-sensor text-white">{label} Avareage : {roundedValue}</p>
      <div className="h-4 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-500 rounded-md" style={{ width: `${percentage}%`, backgroundImage: `linear-gradient(to right, ${color1}, ${color2})` }}></div>
      </div>
    </div>
  );
}

function transformData(data) {
  const transformedData = {};

  for (const key in data) {
    const entry = data[key];
    const date = entry["Date"];
    const pH = parseFloat(entry["pH"]);
    const humidity = entry["Humidity"] === "nan" ? 0 : parseInt(entry["Humidity"]);
    const nitrogen = parseInt(entry["N"]);
    const phosphorus = parseInt(entry["P"]);
    const potassium = parseInt(entry["K"]);
    const moisture = parseInt(entry["Moisture"]);

    const formattedDate = format(parseISO(date), "EEEE, yyyy-MM-dd", { locale: id });

    if (!transformedData[formattedDate]) {
      transformedData[formattedDate] = {
        Nitrogen: [nitrogen],
        Pospor: [phosphorus],
        Kalium: [potassium],
        pH: [pH],
        Kelembaban: [humidity],
      };
    } else {
      transformedData[formattedDate].Nitrogen.push(nitrogen);
      transformedData[formattedDate].Pospor.push(phosphorus);
      transformedData[formattedDate].Kalium.push(potassium);
      transformedData[formattedDate].pH.push(pH);
      transformedData[formattedDate].Kelembaban.push(humidity);
    }
  }

  for (const key in transformedData) {
    const entry = transformedData[key];
    const sensorNames = ["Nitrogen", "Pospor", "Kalium", "pH", "Kelembaban"];

    for (const sensorName of sensorNames) {
      const sensorValues = entry[sensorName];
      const average = sensorValues.reduce((a, b) => a + b, 0) / sensorValues.length;
      const roundedAverage = Math.round(average);
      entry[sensorName] = roundedAverage; // Mengubah rata-rata menjadi bilangan bulat kelipatan 6
    }
  }

  return transformedData;
}

function CalendarComponents() {
  const [dataJSON, setDataJSON] = useState(null);
  const [selected, setSelected] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("");
  const [labelSelectedDay, setLabelSelectedDay] = useState("");
  const [selectedData, setSelectedData] = useState({});

  const colors1 = ['#367DB1', '#35AA56', '#FFA9A9', '#9378FF', '#C06345'];
  const colors2 = ['#38ACFF', '#45DC6F', '#FFA9A9', '#AF9BFF', '#FF835C'];

  const handleDateSelect = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = format(date, "eeee, yyyy-MM-dd", { locale: id });
      console.log("Tanggal yang dipilih:", formattedDate);

      if (formattedDate in dataJSON) {
        setSelected(date);
        setSelectedDay(formattedDate);
        setLabelSelectedDay(formattedDate);
        setSelectedData(dataJSON[formattedDate]);
      } else {
        setSelected(date);
        setSelectedDay("");
        setLabelSelectedDay("Data tidak tersedia");
        setSelectedData({});
        console.log("Data tidak tersedia untuk tanggal yang dipilih");
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const predictionsRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");
      onValue(
        predictionsRef,
        (snapshot) => {
          const dataVal = snapshot.val();
          const transformedData = transformData(dataVal);
          setDataJSON(transformedData);
          console.log(transformedData);
        },
        (error) => {
          console.log("Error fetching data NPK CHART:", error);
        }
      );
    };

    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-10 bg-Base1 rounded-3xl p-5 mt-5'>
      <div className='col-span-2'>
        {/* Bagian Kiri */}
        <div className="calendar-container">
          <div className="calendar-tittle">
            <p>Kalender</p>
          </div>
          <div className="component-container">
            <DayPicker mode="single" selected={selected} onSelect={handleDateSelect} showOutsideDays fixedWeeks />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-row bg-Base1 rounded-3xl p-5 mt-5">
        {/* Bagian Kanan */}
        <div className="flex justify-between text-white">
          <div className="flex h-16 py-5">
            <p className='text-sensor text-white'>{labelSelectedDay}</p>
          </div>
        </div>
        <div className='grid grid-rows-2 gap-1'>
          <div className="grid grid-rows-5 gap-1">
            {Object.keys(selectedData).map((sensor, index) => (
              <ProgressBar key={sensor} label={sensor} value={selectedData[sensor]} color1={colors1[index]} color2={colors2[index]} />
            ))}
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarComponents;
