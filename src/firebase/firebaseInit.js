import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGXtbG0_b_8kkWdO8CVkMJyi2A8x6BLb8",
  authDomain: "fir-blogs-ai-app.firebaseapp.com",
  projectId: "fir-blogs-ai-app",
  storageBucket: "fir-blogs-ai-app.appspot.com",
  messagingSenderId: "998918065229",
  appId: "1:998918065229:web:892d1e435edc5bf48ee004",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebase.firestore();
