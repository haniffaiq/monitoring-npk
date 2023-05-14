import React from "react";
import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ProfilePict from "../../Assets/images/cantiknyasyhdn.jpg";
import BackArrow from "../../Assets/images/back-arrow.png";

function Profile(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleClick = () => {
    setIsLoading(true);

    // Your asynchronous task here
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="profile-main-container">
      <div className="profile-content-container">
        <div className="tombol-back-content">
          <button>
            <img src={BackArrow} className="back-arrow-icon" />
          </button>

          <p>Edit Profile</p>
        </div>
        <div className="separator-container">
          <hr className="separator" />
        </div>
        <div className="edit-profile-content-container">
          <div className="edit-profile-bio-container">
            <div className="tittle-section-container">
              <h5>Informasi Pengguna</h5>
              <p>Disini anda dapat mengubah informasi publik tentang diri anda. Perubahan akan ditampilkan untuk dilihat oleh pengguna lain.</p>
              <div className="regist-label-name">
                <label htmlFor="input-email">Nama Depan</label>
                <label htmlFor="input-email">Nama Belakang</label>
              </div>
              <div className="regist-name">
                <input type="text" id="input-email" placeholder="Nama Depan" />
                <input type="text" id="input-email" placeholder="Nama Belakang" />
              </div>
              <div className="password-profile-container">
                <label htmlFor="input-password">Password</label>
                <div className="password-input-wrapper">
                  <input type={showPassword ? "text" : "password"} id="input-password" placeholder="Minimal 8 Karakter" />
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
                </div>

                <div className="confirm-pass-container">
                  <label htmlFor="input-password">Konfirmasi Password</label>
                  <div className="password-input-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"} id="input-password" placeholder="Minimal 8 Karakter" />
                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} onClick={togglePasswordConfirmVisibility} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="edit-profile-pict-container">
            <div className="tittle-section-pict-container">
              <h5>Foto Profil</h5>
              <p>Disini anda dapat mengubah profil foto untuk mwakili identitas diri anda. Perubahan akan ditampilkan untuk dilihat oleh pengguna lain.</p>
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-4 profile-pict-section-cont">
              <div class="row-span-3 ... picture-container">
                <img src={ProfilePict} className="profile-image" />
              </div>
              <div class="col-span-2 ...">
                <button className="button-unggah">Unggah Foto Profil</button>
              </div>
              <div class="row-span-2 col-span-2 ...">
                <button className="button-batal">Hapus Foto Profil</button>
              </div>
            </div>
            <button className="button-simpan" disabled={isLoading} onClick={handleClick}>
              {isLoading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
