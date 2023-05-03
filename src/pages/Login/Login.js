import React from "react";
import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login(props) {
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
      <div className="loginContainer">
        <div className="loginWelcomeContainer">
          <p className="loginSelamatDatangTXT">Selamat Datang</p>
          <p className="loginMasukKeAkunAndaTXT">Masuk ke akun anda</p>
          <div className="login-form">
            <label htmlFor="input-username">Email</label>
            <input type="text" id="input-username" placeholder="yourname@gmail.com" />
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
              <p>Lupa Password?</p>
            </div>
            <button onClick={handleClick} className="masuk-button">
              Masuk
            </button>
            <div className="separator-container">
              <hr className="separator-line" />
              <span className="separator-text">Atau</span>
              <hr className="separator-line" />
            </div>
            <button onClick={handleClick} className="daftar-button">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
