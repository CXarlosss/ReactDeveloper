// src/routes/AllRoutes.js
import React from "react"
import { Routes, Route } from "react-router-dom"
import { Home, Card } from "../pages"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />          
        </Routes>
    )
}
