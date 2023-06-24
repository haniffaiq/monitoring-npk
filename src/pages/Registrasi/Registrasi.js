import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Ilust from "../../Assets/images/ilust.png";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

import firebaseConfig from "../../Firebase";

function Registrasi(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleRegistrasiClick = () => {
    const database = getDatabase();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        // Simpan data pengguna di Firebase Realtime Database
        const userRef = ref(database, "users/" + userId);
        // const newUserRef = push(userRef);
        const userData = {
          userId: userId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          profilePicture: null,
        };
        set(userRef, userData);

        console.log("Registrasi berhasil. ID pengguna:", userId);
        toast.success("Registrasi berhasil!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("Error saat registrasi:", error.message);
        toast.error("Error saat registrasi! Pastikan data diri & Password sudah benar", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
    console.log("Button clicked!");
  };
  return (
    <div className="mainContainer">
      <img src={Ilust} className="ilust-img" />
      <div className="registrasiContainer">
        <div className="registrasiWelcomeContainer">
          <p className="registrasiSelamatDatangTXT">Selamat Datang</p>
          <p className="registrasiMasukKeAkunAndaTXT">Buat sebuah akun</p>
          <div className="regist-label-name">
            <label htmlFor="input-email">Nama Depan</label>
            <label htmlFor="input-email">Nama Belakang</label>
          </div>
          <div className="regist-name">
            <input type="text" id="input-nama-depan" placeholder="Nama Depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" id="input-nama-belakang" placeholder="Nama Belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="registrasi-form">
            <label htmlFor="input-email">Email</label>
            <input type="text" id="input-email" placeholder="yourname@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="input-password">Password</label>
            <div className="password-input-wrapper-regist">
              <input type={showPassword ? "text" : "password"} id="input-password" placeholder="Minimal 6 Karakter" value={password} onChange={(e) => setPassword(e.target.value)} />
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
            </div>
            <div className="check-and-forgotpass">
              <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span class="checkmark"></span>
                Ingat saya
              </label>
              <div className="punya-akun-txt-layout">
                <p className="have-acc-txt-regist">Punya akun?</p>
                <p className="txt-2">
                  <Link to="/login">Masuk</Link>
                </p>
              </div>
            </div>
            <button onClick={handleRegistrasiClick} className="masuk-button">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrasi;
