import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-card border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl"></span>
              <span className="text-xl font-bold text-primary-accent">MovieHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premium destination for discovering movies, ratings, and streaming platforms.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/trending" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
              <li><Link to="/popular" className="text-gray-400 hover:text-white transition-colors">Popular</Link></li>
              <li><Link to="/top-rated" className="text-gray-400 hover:text-white transition-colors">Top Rated</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Action</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Drama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Comedy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Thriller</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-accent transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-accent transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-accent transition-colors">
                <FiLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-accent transition-colors">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MovieHub. All rights reserved. | Data provided by TMDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
