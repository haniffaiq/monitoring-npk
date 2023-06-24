import { React, useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import { format, isSameDay, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import { getDatabase, ref, onValue } from "firebase/database";


import "react-day-picker/dist/style.css";
import "./Calendar.css";

const database = getDatabase();

function ProgressBar({ label, value, color1, color2 }) {
  return (
    <div>
      <p className="mb-1 text-lg font-medium text-sensor text-white">{label}</p>
      <div className="h-4 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-500 rounded-md" style={{ width: `${value}%`, backgroundImage: `linear-gradient(to right, ${color1}, ${color2})` }}></div>
      </div>
    </div>
  );
}



function CalenderComponents() {
  const [dataJSON, setData] = useState({
    "Senin, 2023-01-01": { Nitrogen: 0, Pospor: 0, Kalium: 0, pH: 0, Kelembaban: 0 },
    "Senin, 2023-06-05": { Nitrogen: 50, Pospor: 30, Kalium: 80, pH: 7, Kelembaban: 60 },
    "Selasa, 2023-06-06": { Nitrogen: 70, Pospor: 40, Kalium: 90, pH: 7.5, Kelembaban: 65 },
    "Rabu, 2023-06-07": { Nitrogen: 60, Pospor: 35, Kalium: 85, pH: 6.5, Kelembaban: 70 },
    "Kamis, 2023-06-08": { Nitrogen: 80, Pospor: 50, Kalium: 95, pH: 8, Kelembaban: 75 },
    "Jumat, 2023-06-09": { Nitrogen: 90, Pospor: 60, Kalium: 100, pH: 8.5, Kelembaban: 80 },
    "Sabtu, 2023-06-10": { Nitrogen: 70, Pospor: 45, Kalium: 90, pH: 7.5, Kelembaban: 75 },
    "Minggu, 2023-06-11": { Nitrogen: 60, Pospor: 40, Kalium: 85, pH: 6.5, Kelembaban: 70 }
  });

  const [tempData, setTempData] = useState([]);

  const [selected, setSelected] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Minggu, 2023-06-11");
  const [labelSelectedDay, setLabelSelectedDay] = useState("");
  const selectedData = dataJSON[selectedDay];
  const colors1 = ['#367DB1', '#35AA56', '#FFA9A9', '#9378FF', '#C06345'];
  const colors2 = ['#38ACFF', '#45DC6F', '#FFA9A9', '#AF9BFF', '#FF835C'];

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

  const handleDateSelect = (date) => {

    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = format(date, "eeee, yyyy-MM-dd", { locale: id });
      console.log("Tanggal yang dipilih:", formattedDate);

      if (formattedDate in dataJSON) {
        setSelected(date);
        setSelectedDay(formattedDate);
        setLabelSelectedDay(formattedDate);

      } else {
        setSelected(date);
        setSelectedDay("Senin, 2023-01-01");
        setLabelSelectedDay("Data tidak tersedia");
        console.log("Data tidak tersedia untuk tanggal yang dipilih");
      }
    }
    // else {
    //   console.error("Invalid date value:", selected);
    // }
  };

  useEffect(() => {
    const fetchData = () => {
      const predictionsRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");
      onValue(
        predictionsRef,
        (snapshot) => {
          const dataVal = snapshot.val();
          const transformedData = transformData(dataVal); // Menggunakan fungsi transformData di sini
          setTempData(transformedData)
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
        {/* Bagian Kiri */}
        <div className="flex justify-between text-white">
          <div className="flex h-16 py-5">
            <p className='text-sensor text-white'>{labelSelectedDay}</p>
          </div>

          {/* <div className="rounded-md px-2 py-1 bg-Base1 text-selector">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-6 py-2 rounded-md bg-Base1"
            >
              {Object.keys(data).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        <div className='grid grid-rows-2 gap-1'>
          <div className="grid grid-rows-5 gap-1">
            {Object.keys(selectedData).map((sensor, index) => (
              <ProgressBar key={sensor} label={sensor} value={selectedData[sensor]} color1={colors1[index]} color2={colors2[index]} />
            ))}
          </div>

          <div className="grid grid-rows-2 gap-1">
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CalenderComponents;