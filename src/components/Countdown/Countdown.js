import React, { useState, useEffect } from "react";
import "./style.css";
import Jam from "./../../Assets/images/jam.png";
import CabeIjo from "./../../Assets/images/cabeijo.png";
function Countdown() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // waktu dalam detik

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function formatTime(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  }

  return (
    <div class="grid grid-rows-3 grid-flow-col gap-4 main-container">
      <div class="highlight-graph-container row-span-3 ...">
        <p>ini container graph highlight</p>
      </div>
      <div class="col-span-2 ...">
        <div className="countdown-container">
          <div className="countdown-txt-container">
            <img src={Jam} alt="img" className="jam-img" />
            <p className="countdown-txt-1">
              Diperbarui dalam <span>30 menit</span> sekali
            </p>
          </div>
          <div className="biarfixed">
            <p className="countdown-txt">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>
      <div class="gambar-container row-span-2 col-span-2 ...">
        <img src={CabeIjo} alt="inicabe" className="cabeijo-img" />
      </div>
    </div>
  );
}

export default Countdown;
