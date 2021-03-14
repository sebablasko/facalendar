import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCmK3KHh-S12flYPhTTSM799w3PbefK4TM",
    authDomain: "facalendar-123.firebaseapp.com",
    databaseURL: "https://facalendar-123-default-rtdb.firebaseio.com",
    projectId: "facalendar-123",
    storageBucket: "facalendar-123.appspot.com",
    messagingSenderId: "793853674886",
    appId: "1:793853674886:web:0977cf5da74d6922899807"
  };
  // Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
