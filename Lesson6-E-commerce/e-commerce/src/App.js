import { AllRoutes } from './routes/AllRoutes';
import { Footer } from './components/Layouts/Footer';
import { Header } from './components/Layouts/Header';
import './App.css';
import './App.css';
import React from 'react';
import "./App.css"
function App() {
  return (
    <div className="App dark:bg-dark">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;