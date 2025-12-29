import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Server error");
    }
  }

  return (
    <div className="container mx-auto bg-white max-w-md mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col gap-4"
      >
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 shadow-lg"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 shadow-lg"
            required
          />
        </div>
        <button
          className="  bg-blue-500 hover:bg-blue-600 transition-colors duration-500
 text-white rounded-md text-center py-2 px-4 cursor-pointer"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mb-4 text-center mt-3">{error}</p>}
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline hover:text-blue-900 transition-colors duration-500"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
