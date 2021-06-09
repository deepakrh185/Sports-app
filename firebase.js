import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAeT2ksG_enM1ZlF8_HS5OnzISdIjF3lKQ",
  authDomain: "sports-7e962.firebaseapp.com",
  projectId: "sports-7e962",
  storageBucket: "sports-7e962.appspot.com",
  messagingSenderId: "773744397939",
  appId: "1:773744397939:web:00a8bb3ad31611bde96406",
  measurementId: "G-LYYDMGQMDE",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default firebaseConfig;
