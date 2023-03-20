import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_eK4MBEnicpLXOHFtX-Q2xSRhNIs5bgQ",
  authDomain: "clase77-5a355.firebaseapp.com",
  projectId: "clase77-5a355",
  storageBucket: "clase77-5a355.appspot.com",
  messagingSenderId: "487786889764",
  appId: "1:487786889764:web:1493535c51a859a18eceb1"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
