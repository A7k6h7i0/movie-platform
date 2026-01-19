import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Invalid email address";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile.trim())) {
      newErrors.mobile = "Invalid Indian mobile number";
    }

    if (form.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalizedUser = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      mobile: form.mobile.trim(),
      password: form.password.trim(),
    };

    localStorage.setItem("registeredUser", JSON.stringify(normalizedUser));
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-5xl font-bold text-red-600 mb-2">MovieHub</h1>
            <p className="text-gray-400 text-sm">Create your account</p>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
          <p className="text-gray-400 mb-6">Start your movie journey today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-gray-900/50 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all`}
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-gray-900/50 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Mobile Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full bg-gray-900/50 border ${
                    errors.mobile ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all`}
                />
              </div>
              {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className={`w-full bg-gray-900/50 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiCheckCircle size={20} />
                  Create Account
                </span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:text-red-400 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
