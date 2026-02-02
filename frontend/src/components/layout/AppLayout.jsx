import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { ShuffleProvider } from '../../context/ShuffleContext';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <ShuffleProvider>
        <Navbar />
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
        <Footer />
      </ShuffleProvider>
    </div>
  );
};

export default AppLayout;
