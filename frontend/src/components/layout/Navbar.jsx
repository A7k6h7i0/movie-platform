import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/trending', label: 'Trending' },
    { path: '/upcoming', label: 'Upcoming' },
    { path: '/popular', label: 'Popular' },
    { path: '/top-rated', label: 'Top Rated' },
    { path: '/browse-language', label: 'Browse by Language' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary-accent">
              MovieHub
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium hover:text-primary-accent ${
                      isActive ? 'text-primary-accent' : 'text-gray-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">
              {/* SEARCH */}
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="bg-white/10 text-white rounded-full px-4 py-2 pl-10 w-64"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </form>

              {/* USER */}
              {user ? (
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block text-white text-sm">
                      {user.name}
                    </span>
                  </div>

                  {/* DROPDOWN */}
                  <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-primary-accent"
                >
                  Login
                </Link>
              )}

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export default Navbar;
