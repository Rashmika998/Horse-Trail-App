// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyApdomZD6PKMGYwoKUMYisyJTPFl_3NOh8",
//   authDomain: "horsetrail-d62ed.firebaseapp.com",
//   projectId: "horsetrail-d62ed",
//   storageBucket: "horsetrail-d62ed.appspot.com",
//   messagingSenderId: "164520129521",
//   appId: "1:164520129521:web:243646092037cf46ce4a50",
//   measurementId: "G-X6ZVF72JRN",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

/*Rashmika's Configs */

// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC70zbjFtiPPpkg99wDi_50ztKmNRu_XZU",
  authDomain: "newone-2fdde.firebaseapp.com",
  projectId: "newone-2fdde",
  storageBucket: "newone-2fdde.appspot.com",
  messagingSenderId: "424758278980",
  appId: "1:424758278980:web:0bb6f68b4b0f8684c73511",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
export { db, auth };
