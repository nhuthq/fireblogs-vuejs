import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ8LHDlfeRo0JLoZYRv7hiEaJ2taAkufQ",
  authDomain: "fire-blog-vuejs.firebaseapp.com",
  projectId: "fire-blog-vuejs",
  storageBucket: "fire-blog-vuejs.appspot.com",
  messagingSenderId: "164455781445",
  appId: "1:164455781445:web:519327390e31b5e0867f2c",
  measurementId: "G-FB4RRYQWZ7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Analytics
const firebaseAnalytics = getAnalytics(firebaseApp);

// FireStore
const firestoreDB = getFirestore(firebaseApp);

// FireAuth
const firebaseAuth = getAuth();

export {
  firebaseAuth,
  firebaseApp,
  firebaseAnalytics,
  firestoreDB,
  createUserWithEmailAndPassword,
};
