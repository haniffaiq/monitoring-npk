import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Ilust from "../../Assets/images/ilust.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login berhasil, akses data pengguna melalui userCredential.user
        const user = userCredential.user;
        console.log("Login berhasil. ID pengguna:", user.uid);
        toast.success("Login berhasil", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/homepage");
      })
      .catch((error) => {
        // Terjadi kesalahan saat login, tangani error di sini
        console.log("Error saat login:", error.message);
        toast.error("Error saat login!,Pastikan Email & Password Kamu Sudah Benar", {
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
  const handleClick2 = () => {
    navigate("/registrasi");
  };
  return (
    <div className="mainContainerLogin">
      <img src={Ilust} className="ilust-img" />
      <div className="loginContainer">
        <div className="loginWelcomeContainer">
          <p className="loginSelamatDatangTXT">Selamat Datang</p>
          <p className="loginMasukKeAkunAndaTXT">Masuk ke akun anda</p>
          <div className="login-form">
            <label htmlFor="input-username">Email</label>
            <input type="text" id="input-username" placeholder="yourname@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="input-password">Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} id="input-password" placeholder="Minimal 6 Karakter" value={password} onChange={(e) => setPassword(e.target.value)} />
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
            </div>
            <div className="check-and-forgotpass-login">
              <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span class="checkmark"></span>
                Ingat saya
              </label>
              <p>Lupa Password?</p>
            </div>
            <button onClick={handleLogin} className="masuk-button-login">
              Masuk
            </button>
            <ToastContainer />
            <div className="separator-container">
              <hr className="separator-line" />
              <span className="separator-text">Atau</span>
              <hr className="separator-line" />
            </div>
            <button onClick={handleClick2} className="daftar-button">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
