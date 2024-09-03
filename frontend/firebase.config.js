// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVdhfpmVWrB0xfhHUklUU_-Qd9Iir4n6U",
  authDomain: "projectdb-38b24.firebaseapp.com",
  projectId: "projectdb-38b24",
  storageBucket: "projectdb-38b24.appspot.com",
  messagingSenderId: "579383319109",
  appId: "1:579383319109:web:3e0769acf1cbde9b9e612c",
  measurementId: "G-JQD3SKTCDC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
