import { useDispatch } from "react-redux";
import "./App.css";
import React, { useEffect, useState } from "react";
import authService from "./appwrite/auth/auth";
import { login, logout } from "./store/authSlice";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getcurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-600">
 <div className="w-full block">
  <Header />
  <main>
   T <Outlet />
  </main>
  <Footer />
 </div>
    </div>
  ) : null;
}

export default App;
