import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHSkjzIWYjEeS429EXlC7Ou5N2HnyBplU",
  authDomain: "tugas-akhir-5d947.firebaseapp.com",
  databaseURL: "https://tugas-akhir-5d947-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tugas-akhir-5d947",
  storageBucket: "tugas-akhir-5d947.appspot.com",
  messagingSenderId: "52534138326",
  appId: "1:52534138326:web:cd040d39682593f3100077",
  measurementId: "G-T1R0DBD2KD",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
export default firebaseConfig;
