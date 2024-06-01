import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyDXddyPkrFf0tOas9ZbPEyJyp3Q-rtRD30",
  authDomain: "nist-atndn.firebaseapp.com",
  databaseURL: "https://nist-atndn-default-rtdb.firebaseio.com",
  projectId: "nist-atndn",
  storageBucket: "nist-atndn.appspot.com",
  messagingSenderId: "684263793837",
  appId: "1:684263793837:web:98b7b2775742c7046b26c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

ReactDOM.render(<App db={db} />, document.getElementById('root'));