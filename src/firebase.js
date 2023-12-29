// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVcs2BwM3N5v_lZm9gYivBjfO8BIgydaY",
  authDomain: "sample-bd02a.firebaseapp.com",
  projectId: "sample-bd02a",
  storageBucket: "sample-bd02a.appspot.com",
  messagingSenderId: "445449868134",
  appId: "1:445449868134:web:e1ca186eb2cf79e4bd6ea7",
  measurementId: "G-1W3L19C0L7",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
