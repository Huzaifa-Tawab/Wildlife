// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrqPyUX3YHYhSUFTooxl5n_uO7nDMbCaI",
  authDomain: "shed-management-e5ab6.firebaseapp.com",
  databaseURL: "https://shed-management-e5ab6-default-rtdb.firebaseio.com",
  projectId: "shed-management-e5ab6",
  storageBucket: "shed-management-e5ab6.appspot.com",
  messagingSenderId: "382537012962",
  appId: "1:382537012962:web:d444a0113a8c6b7751b0bb",
  measurementId: "G-NYHM5Y4F1C",
};

const FirebaseInit = initializeApp(firebaseConfig);

export default FirebaseInit;
