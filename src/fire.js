import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCVKhRgSS4N1E6-IGO8aGZL0sMj4Yf1sI4",
  authDomain: "login-c6e6a.firebaseapp.com",
  projectId: "login-c6e6a",
  storageBucket: "login-c6e6a.appspot.com",
  messagingSenderId: "188078784888",
  appId: "1:188078784888:web:a8af3451bc7c8dc830488d",
};

const fire = initializeApp(firebaseConfig);

//Need to export:
export default fire;
