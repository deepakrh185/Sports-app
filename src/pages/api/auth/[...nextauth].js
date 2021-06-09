import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAeT2ksG_enM1ZlF8_HS5OnzISdIjF3lKQ",
  authDomain: "sports-7e962.firebaseapp.com",
  databaseURL: "https://sports-7e962-default-rtdb.firebaseio.com",
  projectId: "sports-7e962",
  storageBucket: "sports-7e962.appspot.com",
  messagingSenderId: "773744397939",
  appId: "1:773744397939:web:00a8bb3ad31611bde96406",
  measurementId: "G-LYYDMGQMDE",
};

const fireStore = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
).firestore();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(fireStore),
});
