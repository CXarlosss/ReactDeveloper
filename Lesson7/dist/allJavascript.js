// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpw1nSSTiq88vvJRwBKXo015kUWldbM8A",
  authDomain: "notnotion-7c994.firebaseapp.com",
  projectId: "notnotion-7c994",
  storageBucket: "notnotion-7c994.firebasestorage.app",
  messagingSenderId: "886248722011",
  appId: "1:886248722011:web:6dd506d3034c7f958af97e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const colRef = collection(db, "movies");

const movieList = document.getElementById("movie-list");
const form = document.getElementById("add-movie-form");
const authForm = document.getElementById("auth-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authSection = document.getElementById("auth-section");

let editMode = false;
let editId = null;

// 🔃 Mostrar películas
function showMovies() {
  const q = query(colRef, orderBy("name", "asc"));
  onSnapshot(q, (snapshot) => {
    movieList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const li = document.createElement("li");
      const isOwner = data.createdBy === auth.currentUser?.email;
        li.innerHTML = `
          <div>
            <strong>${data.name}</strong>: ${data.description} 
            <em>[${data.category}, ${data.year}]</em><br>
            <small>🎟️ Creado por: ${data.createdBy || "anónimo"}</small>
          </div>
          <div>
            ${isOwner ? `
              <button data-id="${docSnap.id}" class="delete">❌</button>
              <button data-id="${docSnap.id}" class="edit">✏️</button>
            ` : ""}
          </div>
        `;
      movieList.appendChild(li);
    });
  });
}

// 🔑 Estado del usuario (logueado o no)
const welcomeMsg = document.getElementById("welcome-msg");

onAuthStateChanged(auth, (user) => {
  if (user) {
    form.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    authSection.classList.add("hidden");
    showMovies();

    welcomeMsg.textContent = `Bienvenido, ${user.email}`;
    welcomeMsg.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    authSection.classList.remove("hidden");
    welcomeMsg.classList.add("hidden");
    movieList.innerHTML = "";
  }
});

// 🔐 Login
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    authForm.reset();
  } catch (err) {
    alert("Error al iniciar sesión: " + err.message);
  }
});

// 📝 Registro
registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    alert("Completa los campos");
    return;
  }

  if (password.value.length < 6) {
    alert("La contraseña debe tener mínimo 6 caracteres");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    alert("✅ Usuario registrado con éxito");
    authForm.reset();
  } catch (err) {
    alert("❌ Error al registrar: " + err.message);
  }
});

// 🚪 Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// 🎬 Guardar / actualizar película
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const year = parseInt(document.getElementById("year").value);

  if (editMode) {
    await updateDoc(doc(db, "movies", editId), {
      name,
      description,
      category,
      year,
    });
    editMode = false;
    editId = null;
  } else {
    await addDoc(colRef, {
      name,
      description,
      category,
      year,
      createdBy: auth.currentUser.email, // 👈 aquí guardamos el creador
    });
  }

  form.reset();
});

// 🎬 Eliminar o editar
movieList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (e.target.classList.contains("delete")) {
    await deleteDoc(doc(db, "movies", id));
  }
  if (e.target.classList.contains("edit")) {
    const docSnap = await getDoc(doc(db, "movies", id));
    const data = docSnap.data();
    document.getElementById("name").value = data.name;
    document.getElementById("description").value = data.description;
    document.getElementById("category").value = data.category;
    document.getElementById("year").value = data.year;
    editMode = true;
    editId = id;
  }
});