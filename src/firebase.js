// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8CM7tXk6gS8UlXirHOrJ2bCCC3zVQw2o",
  authDomain: "news-app-6c8d9.firebaseapp.com",
  projectId: "news-app-6c8d9",
  storageBucket: "news-app-6c8d9.appspot.com",
  messagingSenderId: "11835752276",
  appId: "1:11835752276:web:28c3b67efb0e5d3ab6d2c1",
  measurementId: "G-9CGX7QMD0N",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
