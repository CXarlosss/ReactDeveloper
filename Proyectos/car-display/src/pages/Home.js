// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/cars.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Cars Taller </h1>
        <p> Best Cars In The Street</p>
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;