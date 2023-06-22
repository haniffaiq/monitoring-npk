import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ProfilePict from "../../Assets/images/cantiknyasyhdn.jpg";
import BackArrow from "../../Assets/images/back-arrow.png";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import firebaseConfig from "../../Firebase";

function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      const auth = getAuth();
      const currentUser = auth.currentUser;
      const database = getDatabase();
      const usersRef = ref(database, `users/${currentUser.uid}`);
      const updates = {
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await update(usersRef, updates);

      if (newPassword) {
        await updatePassword(currentUser, newPassword);
      }

      console.log("Data updated successfully");

      setIsLoading(false);
    } catch (error) {
      console.log("Error updating data:", error);
      setIsLoading(false);
    }
  };
  const handleBackOnClick = () => {
    navigate("/homepage");
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, email } = currentUser;
        const database = getDatabase();
        const usersRef = ref(database, `users/${uid}`);
        onValue(usersRef, (snapshot) => {
          const userData = snapshot.val();
          setUser({ ...userData, email });
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return null; // Tidak ada pengguna yang login, tampilkan apa pun yang sesuai dengan kebutuhan Anda
  }

  return (
    <div className="profile-main-container">
      <div className="profile-content-container">
        <div className="tombol-back-content">
          <button onClick={handleBackOnClick}>
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
              <div className="regist-name-profile">
                <input
                  type="text"
                  id="input-nama-depan"
                  placeholder="Nama Depan"
                  value={user ? user.firstName : ""}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      firstName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  id="input-nama-belakang"
                  placeholder="Nama Belakang"
                  value={user ? user.lastName : ""}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="password-profile-container">
                <label htmlFor="input-password">Password</label>
                <div className="password-input-wrapper">
                  <input type={showPassword ? "text" : "password"} id="input-password" placeholder="Minimal 6 Karakter" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
            <button className="button-simpan" disabled={isLoading} onClick={handleUpdate}>
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
