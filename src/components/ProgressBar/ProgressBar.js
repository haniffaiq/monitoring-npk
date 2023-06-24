import { React, useState, useEffect } from 'react';
import './style.css';
import { getDatabase, ref, onValue } from "firebase/database";

const database = getDatabase();


const ProgressBar = () => {
    const [data, setData] = useState([
        { day: "Senin", Nitrogen: 60, Pospor: 80, Kalium: 90, pH: 50, Kelembaban: 7 },
        { day: "Selasa", Nitrogen: 70, Pospor: 40, Kalium: 60, pH: 80, Kelembaban: 186 },
        { day: "Rabu", Nitrogen: 50, Pospor: 70, Kalium: 80, pH: 60, Kelembaban: 50 },
        { day: "Kamis", Nitrogen: 90, Pospor: 60, Kalium: 50, pH: 70, Kelembaban: 80 },
        { day: "Jumat", Nitrogen: 40, Pospor: 50, Kalium: 70, pH: 90, Kelembaban: 60 },
        { day: "Sabtu", Nitrogen: 80, Pospor: 90, Kalium: 40, pH: 50, Kelembaban: 70 },
        { day: "Minggu", Nitrogen: 60, Pospor: 80, Kalium: 70, pH: 80, Kelembaban: 90 },
    ]);
    const [tempData, setTempData] = useState([])
    const [selectedSensor, setSelectedSensor] = useState("Nitrogen");

    function transformData(data1) {
        // Membuat objek kosong untuk menyimpan data hasil transformasi
        const transformedData = {};
      
        // Iterasi melalui setiap entri dalam data1
        for (const key in data1) {
          const entry = data1[key];
          const date = entry["Date"];
      
          // Jika tanggal belum ada dalam transformedData, tambahkan entri baru
          if (!(date in transformedData)) {
            transformedData[date] = {
              day: getDayOfWeek(date),
              Nitrogen: [],
              Pospor: [],
              Kalium: [],
              pH: [],
              Kelembaban: []
            };
          }
      
          // Menambahkan nilai sensor ke array yang sesuai dalam transformedData
          transformedData[date]["Nitrogen"].push(parseInt(entry["N"]));
          transformedData[date]["Pospor"].push(parseInt(entry["P"]));
          transformedData[date]["Kalium"].push(parseInt(entry["K"]));
          transformedData[date]["pH"].push(parseFloat(entry["pH"]));
          transformedData[date]["Kelembaban"].push(parseInt(entry["Moisture"]));
        }
      
        // Menghitung rata-rata dari nilai sensor dalam setiap entri transformedData
        for (const key in transformedData) {
          const entry = transformedData[key];
          const sensorNames = ["Nitrogen", "Pospor", "Kalium", "pH", "Kelembaban"];
      
          for (const sensorName of sensorNames) {
            const sensorValues = entry[sensorName];
            const average = sensorValues.reduce((a, b) => a + b, 0) / sensorValues.length;
            const roundedAverage = Math.round(average / 6 )*6;
            entry[sensorName] = roundedAverage; // Mengubah rata-rata menjadi bilangan bulat
          }
        }
      
        // Mengubah objek transformedData menjadi array
        const transformedArray = Object.values(transformedData);
      
        // Mengambil data Senin hingga Minggu terakhir
        const lastWeekData = transformedArray.slice(-7);
      
        // Jika data Senin hingga Minggu tidak lengkap, menggunakan 7 hari data sebelum Minggu terakhir
        if (lastWeekData.length < 7) {
          const remainingDays = 7 - lastWeekData.length;
          const previousWeekData = transformedArray.slice(-7 - remainingDays, -7);
          lastWeekData.unshift(...previousWeekData);
        }
      
        return lastWeekData;
      }
      
      // Fungsi helper untuk mendapatkan nama hari berdasarkan tanggal
      function getDayOfWeek(dateString) {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const date = new Date(dateString);
        const dayOfWeek = date.getDay();
        return days[dayOfWeek];
      }
      
      // Menggunakan fungsi transformData untuk mengubah data1 menjadi format data2

      

    // Menggunakan fungsi transformData untuk mengubah data1 menjadi format data2

    useEffect(() => {
        const fetchData = async () => {
            const predictionsRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");
            await onValue(
                predictionsRef,
                (snapshot) => {
                    const dataVal = snapshot.val();
                    const transformedData = transformData(dataVal); // Menggunakan fungsi transformData di sini
                    setTempData(transformedData);
                    console.log("Data dari Firebase:", transformedData);
                    setData(transformedData)
                },
                (error) => {
                    console.log("Error fetching data NPK CHART:", error);
                }
            );
        };

        fetchData();
    }, []);

    const handleChange = (value) => {
        setSelectedSensor(value);
    };

    const maxValue = 360;

    const getBarColor = (value) => {
        if (value < 40) {
            return "bg-red-500";
        } else if (value < 70) {
            return "bg-yellow-500";
        } else {
            return "bg-green-500";
        }
    };


    return (
        <div className="grid grid-flow-row items-center">
            <div className="flex justify-between text-white text-opacity-50 py-4 ">
                <div className="flex px-10 py-5 text-judul">
                    <p>Highlight Hari Ini</p>
                </div>

                <div className="flex h-16 px-10 py-5">
                    <div>

                        <select
                            id="sensor"
                            className=" rounded-md px-2 py-1 bg-Base1 text-selector"
                            defaultValue={selectedSensor}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <option value="Nitrogen">Nitrogen</option>
                            <option value="Pospor">Pospor</option>
                            <option value="Kalium">Kalium</option>
                            <option value="pH">pH</option>
                            <option value="Kelembaban">Kelembaban</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-7 gap-4 ">
                {data.map((dayData) => (
                    <div key={dayData.day} className="flex flex-col items-center justify-center">
                        <p className='text-sensor' style={{ opacity: 0.5 }}>{dayData[selectedSensor]}</p>
                        <div className="w-16 h-60 rounded-lg overflow-hidden rotate-180 mx-3 ">
                            <div
                                className={`hcustom-${(dayData[selectedSensor] / maxValue) * 60}`} rotate-90
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, #35AA56, #45DC6F)`
                                }}
                            ></div>
                            {/* <div
                                className={`hcustom-${1} bg-gray-500`}
                            ></div> */}
                            {/* <div
                                className="h-3 bg-gray-500"
                            ></div> */}
                            <div className="absolute bottom-0 left-0 w-full text-center">

                            </div>
                        </div>
                        <p className='text-sensor text-green-500' style={{ opacity: 0.5 }}>{dayData.day}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
