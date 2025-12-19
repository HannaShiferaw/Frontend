// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import {getAuth}  from  "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvaFIvJKNGv1vdRN4aAN-zgCQpsMUoPco",
  authDomain: "clone-29a5d.firebaseapp.com",
  projectId: "clone-29a5d",
  storageBucket: "clone-29a5d.firebasestorage.app",
  messagingSenderId: "307964706762",
  appId: "1:307964706762:web:e6883f819c9b2532059933",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();