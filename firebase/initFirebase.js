import firebase from "firebase/app";
// the below imports are option - comment out what you don't need
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";

const clientCredentials = {
  apiKey: "AIzaSyAeT2ksG_enM1ZlF8_HS5OnzISdIjF3lKQ",
  authDomain: "sports-7e962.firebaseapp.com",
  projectId: "sports-7e962",
  storageBucket: "sports-7e962.appspot.com",
  messagingSenderId: "773744397939",
  appId: "1:773744397939:web:00a8bb3ad31611bde96406",
  measurementId: "G-LYYDMGQMDE",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined") {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ("measurementId" in clientCredentials) {
        firebase.analytics();
        firebase.performance();
      }
    }
    console.log("Firebase was successfully init.");
  }
}
