// @ts-nocheck
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  GroupDetails,
  AddExpense,
  EditExpense,
  CreateGroup,
  PageNotFound
} from "../pages";
import { ProtectedRoutes } from "./ProtectedRoutes";
import React from "react";

export const AllRoutes = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Redirección raíz (puedes personalizar si quieres una landing más adelante) */}
    <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />

    {/* Rutas protegidas */}
    <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
    <Route path="/create-group" element={<ProtectedRoutes><CreateGroup /></ProtectedRoutes>} />
    <Route path="/group/:groupId" element={<ProtectedRoutes><GroupDetails /></ProtectedRoutes>} />
    <Route path="/group/:groupId/add-expense" element={<ProtectedRoutes><AddExpense /></ProtectedRoutes>} />
    <Route path="/group/:groupId/edit-expense/:expenseId" element={<ProtectedRoutes><EditExpense /></ProtectedRoutes>} />

    {/* Página no encontrada */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);
