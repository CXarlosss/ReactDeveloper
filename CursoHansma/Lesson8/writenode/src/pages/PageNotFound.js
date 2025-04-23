// @ts-nocheck
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import NotFound from "../assets/images/page-not-found.jpg";
import React from "react";

export const PageNotFound = () => {
  useTitle("Page Not Found");

  return (
    <section className="pageNotFound">
      <p>404 / Page Not Found</p>
      <img src={NotFound} alt="Page Not Found" />
      <Link to="/">
        <button>Back To Home</button>
      </Link>
    </section>
  )
}