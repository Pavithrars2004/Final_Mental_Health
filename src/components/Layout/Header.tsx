import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Bell, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
              <path d="M16 16v-3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3"></path>
              <path d="M7 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"></path>
              <path d="M21 10V8a2 2 0 0 0-2-2h-6"></path>
              <path d="M11 6V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3"></path>
              <path d="M7 10v4"></path>
              <path d="M17 10v4"></path>
            </svg>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Serenity AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/journal" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            Journal
          </Link>
          <Link to="/nutrition" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            Nutrition
          </Link>
          <Link to="/fitness" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            Fitness
          </Link>
          <Link to="/chat" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            AI Chat
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <User size={20} className="text-gray-700 dark:text-gray-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden py-4 px-4 glass-card mt-2 rounded-lg"
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/journal" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              to="/nutrition" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Nutrition
            </Link>
            <Link 
              to="/fitness" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitness
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Chat
            </Link>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <div className="flex space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <Link 
                  to="/profile" 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} className="text-gray-700 dark:text-gray-300" />
                </Link>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;