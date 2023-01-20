import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { auth, db } from './firebase';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore/lite';



// const firebaseConfig = {
//   apiKey: "AIzaSyD06XQly7tc95-3RP-MgpIY155eoNxHMjY",
//   authDomain: "solarnails-3f0f0.firebaseapp.com",
//   databaseURL: "https://solarnails-3f0f0-default-rtdb.firebaseio.com",
//   projectId: "solarnails-3f0f0",
//   storageBucket: "solarnails-3f0f0.appspot.com",
//   messagingSenderId: "813533176809",
//   appId: "1:813533176809:web:70449dabab959f58692178",
//   measurementId: "G-RWNZCVYJKT"
// };

// Initialize Firebase
//  const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore(app) 
// const analytics = getAnalytics(app);

// export { auth }
// export default db;

if (false) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8888);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
