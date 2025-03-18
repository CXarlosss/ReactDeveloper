// @ts-nocheck
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import './App.css';

export default function App() {
  const username = "Carlos";
  return (
    <>
    <Header />
    <div>
      <h1 className='active'>{username}</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicin</p>
    </div>
    <Footer />
    </>
  )
}