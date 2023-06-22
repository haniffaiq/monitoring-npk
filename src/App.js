import "./App.css";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./Firebase";
import Homepage from "./pages/Homepage/Homepage";
import Registrasi from "./pages/Registrasi/Registrasi";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const database = getDatabase();

function App() {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     const fetchData = () => {
  //       const predictionsRef = ref(database, "w5JQlOfIKqPBIfxqmmcyK1QD6zn2");
  //       onValue(
  //         predictionsRef,
  //         (snapshot) => {
  //           const dataVal = snapshot.val();
  //           setData(dataVal);
  //           console.log("Data dari Firebase:", dataVal);
  //         },
  //         (error) => {
  //           console.log("Error fetching data:", error);
  //         }
  //       );
  //     };

  //     fetchData();
  //   }, []);

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
