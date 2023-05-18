import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SingleESPData from "./Pages/SingleESPData";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/ESP" element={<SingleESPData />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
