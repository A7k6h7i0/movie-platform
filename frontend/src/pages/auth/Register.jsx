import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Indian mobile number validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile.trim())) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    const normalizedUser = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      mobile: form.mobile.trim(),
      password: form.password.trim()
    };

    localStorage.setItem("registeredUser", JSON.stringify(normalizedUser));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black border border-gray-700"
          required
        />

        <button className="w-full bg-red-600 py-2 rounded">
          Register
        </button>

        <p className="text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
