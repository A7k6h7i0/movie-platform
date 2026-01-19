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
    navigate('/login');
  };

  // ✅ FIXED: Safely get user initials with proper null checks
  const getUserInitials = () => {
    if (!user) return 'U';
    
    // Try to get from name first
    if (user.name && typeof user.name === 'string' && user.name.trim()) {
      return user.name.charAt(0).toUpperCase();
    }
    
    // Fallback to email
    if (user.email && typeof user.email === 'string' && user.email.trim()) {
      return user.email.charAt(0).toUpperCase();
    }
    
    // Final fallback
    return 'U';
  };

  // ✅ FIXED: Safely get display name
  const getDisplayName = () => {
    if (!user) return 'User';
    return user.name || user.email || 'User';
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
                    `text-sm font-medium hover:text-primary-accent transition-colors ${
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
                    className="bg-white/10 text-white placeholder-gray-400 rounded-full px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </form>

              {/* USER */}
              {user ? (
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-primary-accent flex items-center justify-center text-white font-bold text-sm">
                      {getUserInitials()}
                    </div>
                    <span className="hidden md:block text-white text-sm font-medium">
                      {getDisplayName()}
                    </span>
                  </div>

                  {/* DROPDOWN */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-white font-semibold text-sm truncate">
                        {getDisplayName()}
                      </p>
                      {user.email && (
                        <p className="text-gray-400 text-xs truncate mt-1">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors rounded-b-lg"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-primary-accent font-medium transition-colors"
                >
                  Login
                </Link>
              )}

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:text-primary-accent transition-colors"
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
