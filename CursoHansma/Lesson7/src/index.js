import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBpw1nSSTiq88vvJRwBKXo015kUWldbM8A",
  authDomain: "notnotion-7c994.firebaseapp.com",
  projectId: "notnotion-7c994",
  storageBucket: "notnotion-7c994.firebasestorage.app",
  messagingSenderId: "886248722011",
  appId: "1:886248722011:web:6dd506d3034c7f958af97e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchMovies() {
  try {
    const colRef = collection(db, "movies");
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach(doc => {
      console.log(doc.id, doc.data());
    });
    console.log("✅ Conectado a Firebase con éxito");
  } catch (error) {
    console.error("❌ Error al conectar a Firebase:", error.message);
  }
}

fetchMovies();
