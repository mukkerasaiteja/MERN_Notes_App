import { useEffect, useState } from "react";
import { Routes, Navigate, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { data } = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        //alert("Hello" + data.user.username);
        setUser(data);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <div className=" text-2xl text-[#2E2E2E]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Navbar
        user={user}
        setUser={setUser}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={user ? <Home search={search} /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
