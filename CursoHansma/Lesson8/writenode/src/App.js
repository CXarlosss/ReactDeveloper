import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;