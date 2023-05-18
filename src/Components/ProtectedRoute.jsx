import { React, useState, useEffect, useRef } from "react";
// import secureLocalStorage from "react-secure-storage";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isAuthorized = useRef(false);
  // const [isAuthorized,SetIsAuthorized] = useState(true);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // console.log(isAuthorized);
    const User = JSON.parse(localStorage.getItem("User"));
    // if (secureLocalStorage.getItem("User") === true) {
    if (User) {
      isAuthorized.current = true;
      // console.log(isAuthorized);
      setloading(false);
    }
  });

  return loading ? null : isAuthorized.current ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
