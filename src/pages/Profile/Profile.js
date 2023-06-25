import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ProfilePict from "../../Assets/images/cantiknyasyhdn.jpg";
import BackArrow from "../../Assets/images/back-arrow.png";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { getDatabase, ref as databaseRef, update, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import firebaseConfig from "../../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import CloseIcon from "../../Assets/images/close.png";
import WarnIcon from "../../Assets/images/warning.png";

function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openModal1 = () => {
    setModal1IsOpen(true);
  };

  const closeModal1 = () => {
    setModal1IsOpen(false);
  };

  const openModal2 = () => {
    setModal2IsOpen(true);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      const auth = getAuth();
      const currentUser = auth.currentUser;
      const database = getDatabase();
      const usersRef = databaseRef(database, `users/${currentUser.uid}`);
      const updates = {
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await update(usersRef, updates);

      if (newPassword == "" && confirmPassword == "") {
        setIsLoading(false);
        setModal2IsOpen(false);
      }

      if (newPassword != "" && confirmPassword == "") {
        toast.error("Confirm Password harus di isi!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false);
        setModal2IsOpen(false);
      }

      if (newPassword == confirmPassword) {
        await updatePassword(currentUser, newPassword);
        toast.success("Data updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setIsLoading(false);
        setModal2IsOpen(false);
        navigate("/");
      }

      if (newPassword != confirmPassword) {
        toast.error("Gagal!, Pastikan Password dan Confirm Password sama", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/profile");
        setModal2IsOpen(false);
        setIsLoading(false);
      }

      // Jika gambar dipilih, unggah ke Firebase Storage
      if (selectedImage) {
        const storage = getStorage();
        const storageReference = storageRef(storage, `images/${currentUser.uid}`);
        await uploadBytes(storageReference, selectedImage);
        // Dapatkan URL gambar yang diunggah
        const downloadURL = await getDownloadURL(storageReference);
        // Tambahkan URL gambar ke field users
        await update(usersRef, { profilePicture: downloadURL });
        toast.success("Data updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setIsLoading(false);
        setModal2IsOpen(false);
      }
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Error gara-gara?", error);
      setIsLoading(false);
      setModal2IsOpen(false);
    }
  };

  const handleBackOnClick = () => {
    navigate("/homepage");
  };

  const handleButtonPickImageClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", handleImageChange);
    fileInput.click();
  };

  const handleDeleteProfilePicture = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const storage = getStorage();
      const storageReference = storageRef(storage, `images/${currentUser.uid}`);
      await deleteObject(storageReference);

      // Update field 'profilePicture' in the database to null or empty string
      const database = getDatabase();
      const usersRef = databaseRef(database, `users/${currentUser.uid}`);
      const updates = {
        profilePicture: null, // or use empty string if preferred
      };
      await update(usersRef, updates);

      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: null, // or use empty string if preferred
      }));

      toast.success("Foto profile berhasil di hapus!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setModal1IsOpen(false);
    } catch (error) {
      toast.error("Error! Gagal menghapus foto profile", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setModal1IsOpen(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, email } = currentUser;
        const database = getDatabase();
        const usersRef = databaseRef(database, `users/${uid}`);
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
      <Modal isOpen={modal1IsOpen} onRequestClose={closeModal1} contentLabel="Modal 1" className="custom-modal" overlayClassName="custom-modal-overlay">
        <div className="modal-main-container-1">
          <div className="modal-content-container-1">
            <img src={CloseIcon} className="close-icon" />
            <p className="hapus-txt">Hapus Foto Profile</p>
            <p className="confirm-txt">Apakah anda yakin ingin menghapus foto profile?</p>
            <div className="button-modal-layout">
              <button onClick={closeModal1} className="no-button">
                Tidak
              </button>
              <button onClick={handleDeleteProfilePicture} className="yes-button">
                Ya
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={modal2IsOpen} onRequestClose={closeModal2} contentLabel="Modal 2" className="custom-modal" overlayClassName="custom-modal-overlay">
        <div className="modal-main-container-1">
          <div className="modal-content-container-1">
            <img src={WarnIcon} className="close-icon" />
            <p className="hapus-txt">Simpan Perubahan</p>
            <p className="confirm-txt">Apakah anda yakin ingin menyimpan perubahan profile?</p>
            <div className="button-modal-layout">
              <button onClick={closeModal2} className="no-button">
                Tidak
              </button>
              <button onClick={handleUpdate} className="yes-button">
                Ya
              </button>
            </div>
          </div>
        </div>
      </Modal>

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
                    <input type={showConfirmPassword ? "text" : "password"} id="input-password" placeholder="Minimal 6 Karakter" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
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
              <div className="row-span-3 ... picture-container">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="profile-image" />
                ) : (
                  <>{user.profilePicture ? <img src={user.profilePicture} alt="Profile" className="profile-image" /> : <img src={ProfilePict} alt="Default User" className="profile-image" />}</>
                )}
              </div>
              <div class="col-span-2 ...">
                <button className="button-unggah" onClick={handleButtonPickImageClick}>
                  Unggah Foto Profil
                </button>
              </div>
              <div class="row-span-2 col-span-2 ...">
                <button className="button-batal" onClick={openModal1}>
                  Hapus Foto Profil
                </button>
              </div>
            </div>
            <button className="button-simpan" disabled={isLoading} onClick={openModal2}>
              {isLoading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                "Simpan"
              )}
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
