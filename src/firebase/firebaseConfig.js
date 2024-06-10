// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ97COo2NiNVnupn-CB9FVqcA1Wzws8vw",
  authDomain: "goodjob-72768.firebaseapp.com",
  projectId: "goodjob-72768",
  storageBucket: "goodjob-72768.appspot.com",
  messagingSenderId: "129928649422",
  appId: "1:129928649422:web:a1adc57aa838be07e1ce9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
