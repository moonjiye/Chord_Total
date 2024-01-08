import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD1-YVJuZaTOHJ2s7HH-wblQikJzNosmk",
  authDomain: "code8-d7ce8.firebaseapp.com",
  projectId: "code8-d7ce8",
  storageBucket: "code8-d7ce8.appspot.com",
  messagingSenderId: "493450513802",
  appId: "1:493450513802:web:f3c0a83b75e58842c38c73",
  measurementId: "G-TQV1EBXV1M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
