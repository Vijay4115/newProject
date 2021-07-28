import firebase from '@react-native-firebase/app'
require('@react-native-firebase/firestore')


var firebaseConfig = {
  apiKey: "AIzaSyAMZZ85yWnECjY-srgkMEVI3EEr8dODXPw",
  authDomain: "localpushdemo-ea225.firebaseapp.com",
  projectId: "localpushdemo-ea225",
  storageBucket: "localpushdemo-ea225.appspot.com",
  messagingSenderId: "1091277614530",
  appId: "1:1091277614530:web:597918f066ee9ad33ffa5b",
  measurementId: "G-HP0S420RS2"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//db.settings({ host: 'localhost:8080', ssl: false });

export default db;