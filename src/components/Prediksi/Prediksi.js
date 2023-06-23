import { useState } from 'react';
import CalenderComponents from '../Calendar/Calendar';

const data = {
    "Senin": { Nitrogen: 50, Pospor: 30, Kalium: 80, pH: 7, Kelembaban: 60 },
    "Selasa": { Nitrogen: 70, Pospor: 40, Kalium: 90, pH: 7.5, Kelembaban: 65 },
    "Rabu": { Nitrogen: 60, Pospor: 35, Kalium: 85, pH: 6.5, Kelembaban: 70 },
    "Kamis": { Nitrogen: 80, Pospor: 50, Kalium: 95, pH: 8, Kelembaban: 75 },
    "Jumat": { Nitrogen: 90, Pospor: 60, Kalium: 100, pH: 8.5, Kelembaban: 80 },
    "Sabtu": { Nitrogen: 70, Pospor: 45, Kalium: 90, pH: 7.5, Kelembaban: 75 },
    "Minggu": { Nitrogen: 60, Pospor: 40, Kalium: 85, pH: 6.5, Kelembaban: 70 }
};

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

function Prediksi() {
    const [selectedDay, setSelectedDay] = useState("Senin");
    const selectedData = data[selectedDay];
    const colors1 = ['#367DB1', '#35AA56', '#FFA9A9', '#9378FF', '#C06345'];
    const colors2 = ['#38ACFF', '#45DC6F', '#FFA9A9', '#AF9BFF', '#FF835C'];
    return (
        <div className='grid grid-cols-3 gap-10'>
            <div className='col-span-2'>
                <CalenderComponents />
            </div>
            <div className="grid grid-flow-row bg-Base1 rounded-3xl p-5 mt-5">
                {/* Bagian Kiri */}
                <div className="flex justify-between text-white">
                    <div className="flex h-16 py-5">
                        <p className='text-sensor text-white'>History Minggu Lalu</p>
                    </div>

                    <div className="rounded-md px-2 py-1 bg-Base1 text-selector">
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
                    </div>
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

export default Prediksi;