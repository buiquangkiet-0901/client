import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../Pages/Home";
import Tours from "./../Pages/Tours";
import TourDetails from "./../Pages/TourDetails";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";
import SearchResultList from "./../Pages/SearchResultList";

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

      {/* Add routes for other pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Router;
