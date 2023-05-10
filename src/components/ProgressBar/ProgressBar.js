import React, { useState } from 'react';
import './style.css';



const ProgressBar = () => {
    const data = [
        { day: "Senin", Nitrogen: 60, Pospor: 80, Kalium: 90, pH: 50, Kelembaban: 70 },
        { day: "Selasa", Nitrogen: 70, Pospor: 40, Kalium: 60, pH: 80, Kelembaban: 90 },
        { day: "Rabu", Nitrogen: 50, Pospor: 70, Kalium: 80, pH: 60, Kelembaban: 50 },
        { day: "Kamis", Nitrogen: 90, Pospor: 60, Kalium: 50, pH: 70, Kelembaban: 80 },
        { day: "Jumat", Nitrogen: 40, Pospor: 50, Kalium: 70, pH: 90, Kelembaban: 60 },
        { day: "Sabtu", Nitrogen: 80, Pospor: 90, Kalium: 40, pH: 50, Kelembaban: 70 },
        { day: "Minggu", Nitrogen: 60, Pospor: 80, Kalium: 70, pH: 80, Kelembaban: 90 },
    ];

    const [selectedSensor, setSelectedSensor] = useState("Nitrogen");

    const handleChange = (value) => {
        setSelectedSensor(value);
    };

    const maxValue = 100;

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
                    <p>Highlight hai Ini</p>
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
                        <p className='text-sensor text-green-500' style={{opacity: 0.5}}>{dayData.day}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
