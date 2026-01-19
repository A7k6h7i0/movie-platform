import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DEMO_USER = {
  name: "Demo User",
  email: "demo@moviehub.com",
  password: "demo123"
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    // ✅ Match registered user OR demo user
    const isRegisteredUser =
      savedUser &&
      savedUser.email === inputEmail &&
      savedUser.password === inputPassword;

    const isDemoUser =
      DEMO_USER.email === inputEmail &&
      DEMO_USER.password === inputPassword;

    if (isRegisteredUser) {
      login(savedUser);
      navigate("/");
    } else if (isDemoUser) {
      login(DEMO_USER);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black border border-gray-700"
          required
        />

        <button className="w-full bg-red-600 py-2 rounded">
          Login
        </button>

        <p className="text-xs text-gray-400 mt-3">
          Demo login: <br />
          <b>Email:</b> demo@moviehub.com <br />
          <b>Password:</b> demo123
        </p>

        <p className="text-sm mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
