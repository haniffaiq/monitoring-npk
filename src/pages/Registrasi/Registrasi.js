import React from "react";
import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Registrasi(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div className="mainContainer">
      <div className="registrasiContainer">
        <div className="registrasiWelcomeContainer">
          <p className="registrasiSelamatDatangTXT">Selamat Datang</p>
          <p className="registrasiMasukKeAkunAndaTXT">Buat sebuah akun</p>
          <div className="regist-label-name">
            <label htmlFor="input-email">Nama Depan</label>
            <label htmlFor="input-email">Nama Belakang</label>
          </div>
          <div className="regist-name">
            <input type="text" id="input-email" placeholder="Nama Depan" />
            <input type="text" id="input-email" placeholder="Nama Belakang" />
          </div>
          <div className="registrasi-form">
            <label htmlFor="input-email">Email</label>
            <input type="text" id="input-email" placeholder="yourname@gmail.com" />
            <label htmlFor="input-password">Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} id="input-password" placeholder="Minimal 8 Karakter" />
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
            </div>
            <div className="check-and-forgotpass">
              <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span class="checkmark"></span>
                Ingat saya
              </label>
              <div className="punya-akun-txt-layout">
                <p style={{ color: "#ffff" }}>Punya akun?</p>
                <p className="txt-2">Masuk</p>
              </div>
            </div>
            <button onClick={handleClick} className="masuk-button">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrasi;
