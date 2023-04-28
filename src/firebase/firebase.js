import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, collection } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCy5PEXtaaufaEmUzE-x41nzBASEwNh2gg",
  authDomain: "listodo-f5e57.firebaseapp.com",
  projectId: "listodo-f5e57",
  storageBucket: "listodo-f5e57.appspot.com",
  messagingSenderId: "329415732884",
  appId: "1:329415732884:web:c0e63e3671a38169d1ce81",
  measurementId: "G-0YNW7TJH5T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)