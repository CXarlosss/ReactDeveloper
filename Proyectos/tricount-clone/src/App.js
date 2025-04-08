// @ts-nocheck
import React from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./components/Navbar";
import { Header, Footer } from "./components"; // si los tienes
import { auth } from "./firebase/config";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Header />
      {auth.currentUser && <Navbar user={auth.currentUser} />}
      <main>
        <AllRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
