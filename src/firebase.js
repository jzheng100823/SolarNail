
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyD06XQly7tc95-3RP-MgpIY155eoNxHMjY",
  authDomain: "solarnails-3f0f0.firebaseapp.com",
  databaseURL: "https://solarnails-3f0f0-default-rtdb.firebaseio.com",
  projectId: "solarnails-3f0f0",
  storageBucket: "solarnails-3f0f0.appspot.com",
  messagingSenderId: "813533176809",
  appId: "1:813533176809:web:70449dabab959f58692178",
  measurementId: "G-RWNZCVYJKT"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// export default app;

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const analytics = getAnalytics(app);
const perf = getPerformance(app);



export { auth, db }