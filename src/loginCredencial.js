// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWlg2vmUCb4VdSNzBhosgMSAwSrKheI3E",
  authDomain: "resto-login-2025.firebaseapp.com",
  projectId: "resto-login-2025",
  storageBucket: "resto-login-2025.firebasestorage.app",
  messagingSenderId: "59071418051",
  appId: "1:59071418051:web:880e8d9408f3d170badc76"
};

// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig);
export default app_firebase;