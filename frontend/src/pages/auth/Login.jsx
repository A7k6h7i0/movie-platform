import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const DEMO_USER = {
  name: "Demo User",
  email: "demo@moviehub.com",
  password: "demo123",
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    const isRegisteredUser =
      savedUser &&
      savedUser.email === inputEmail &&
      savedUser.password === inputPassword;
    const isDemoUser =
      DEMO_USER.email === inputEmail && DEMO_USER.password === inputPassword;

    if (isRegisteredUser) {
      login(savedUser);
      navigate("/");
    } else if (isDemoUser) {
      login(DEMO_USER);
      navigate("/");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
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
            <p className="text-gray-400 text-sm">Welcome back to the entertainment</p>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-gray-400 mb-6">Continue your movie journey</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@moviehub.com"
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                />
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm font-medium mb-2">Demo Credentials:</p>
            <p className="text-gray-300 text-xs">Email: demo@moviehub.com</p>
            <p className="text-gray-300 text-xs">Password: demo123</p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-500 hover:text-red-400 font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
