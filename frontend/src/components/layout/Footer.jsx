import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-card border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <span className="text-xl font-bold text-primary-accent">MovieHub</span>
            <p className="text-gray-400 text-sm">
              Your premium destination for discovering movies, ratings, and streaming platforms.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/trending" className="text-gray-400 hover:text-white">Trending</Link></li>
              <li><Link to="/popular" className="text-gray-400 hover:text-white">Popular</Link></li>
              <li><Link to="/top-rated" className="text-gray-400 hover:text-white">Top Rated</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/dmca" className="text-gray-400 hover:text-white">DMCA</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <FiGithub className="text-gray-400 hover:text-primary-accent" size={22} />
              <FiTwitter className="text-gray-400 hover:text-primary-accent" size={22} />
              <FiLinkedin className="text-gray-400 hover:text-primary-accent" size={22} />
              <FiMail className="text-gray-400 hover:text-primary-accent" size={22} />
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
