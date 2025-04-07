import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpw1nSSTiq88vvJRwBKXo015kUWldbM8A",
  authDomain: "notnotion-7c994.firebaseapp.com",
  projectId: "notnotion-7c994",
  storageBucket: "notnotion-7c994.firebasestorage.app",
  messagingSenderId: "886248722011",
  appId: "1:886248722011:web:6dd506d3034c7f958af97e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const colRef = collection(db, "movies");

getDocs(colRef).then(data => {
    console.log(data);
})
console.log("conectado a firebase con exito");
console.log("Firebase World!");

