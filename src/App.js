import "./App.css";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./Firebase";
import Homepage from "./pages/Homepage/Homepage";
import Registrasi from "./pages/Registrasi/Registrasi";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const database = getDatabase();
const auth = getAuth();

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

  // useEffect(() => {
  //   const database = getDatabase();
  //   const prediksiRef = ref(database, "prediksi");

  //   const onDataChange = (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("nih data prediksi", data);
  //   };

  //   // Mendengarkan perubahan data pada prediksiRef
  //   const unsubscribe = onValue(prediksiRef, onDataChange);

  //   // Cleanup fungsi ketika komponen tidak lagi digunakan
  //   return () => {
  //     // Hentikan mendengarkan perubahan data
  //     // saat komponen tidak lagi digunakan
  //     unsubscribe();
  //   };
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/homepage" element={isLoggedIn ? <Homepage /> : <Navigate to="/" />} />
        <Route path="/registrasi" element={isLoggedIn ? <Navigate to="/homepage" /> : <Registrasi />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
