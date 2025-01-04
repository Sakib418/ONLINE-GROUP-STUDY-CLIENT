// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpCvxpL-LtIX7hxXtKuH8awzCQCiDKNSg",
  authDomain: "online-group-study-clien-cc654.firebaseapp.com",
  projectId: "online-group-study-clien-cc654",
  storageBucket: "online-group-study-clien-cc654.firebasestorage.app",
  messagingSenderId: "286226197414",
  appId: "1:286226197414:web:92a237d7501f7e81dc3d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export default auth;