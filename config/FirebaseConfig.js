// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "meetingscheduler-6b19a.firebaseapp.com",
  projectId: "meetingscheduler-6b19a",
  storageBucket: "meetingscheduler-6b19a.appspot.com",
  messagingSenderId: "529997588655",
  appId: "1:529997588655:web:ba48661cda3a3e67678c5a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);