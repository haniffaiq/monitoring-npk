import "./App.css";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./Firebase";
import Homepage from "./pages/Homepage/Homepage";
import Registrasi from "./pages/Registrasi/Registrasi";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const database = getDatabase();

function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = () => {
  //     const predictionsRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");
  //     onValue(
  //       predictionsRef,
  //       (snapshot) => {
  //         const dataVal = snapshot.val();
  //         const transformedData = transformData(dataVal); // Menggunakan fungsi transformData di sini
  //         setData(transformedData);
  //         console.log("Data dari Firebase:", transformedData);
  //       },
  //       (error) => {
  //         console.log("Error fetching data:", error);
  //       }
  //     );
  //   };

  //   fetchData();
  // }, []);

  // function transformData(data1) {
  //   const transformedData = [];

  //   for (const key in data1) {
  //     const item = data1[key];
  //     const [date, time] = item.Timestamp.split('T');
  //     const [hours, minutes] = time.split(':');

  //     transformedData.push({
  //       id: transformedData.length + 1,
  //       date: date,
  //       time: `${hours}:${minutes}`,
  //       Nitrogen: parseInt(item.N),
  //       Pospor: parseInt(item.P),
  //       Kalium: parseInt(item.K),
  //       pH: parseFloat(item.pH),
  //       Kelembapan: parseInt(item.Moisture)
  //     });
  //   }

  //   return transformedData;
  // }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
