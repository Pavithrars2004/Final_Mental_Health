import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card mt-12 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                <path d="M16 16v-3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3"></path>
                <path d="M7 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"></path>
                <path d="M21 10V8a2 2 0 0 0-2-2h-6"></path>
                <path d="M11 6V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3"></path>
                <path d="M7 10v4"></path>
                <path d="M17 10v4"></path>
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Serenity AI
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your AI-powered wellness companion for a balanced and healthy life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Health Dashboard
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  AI Journaling
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Nutrition Tracking
                </Link>
              </li>
              <li>
                <Link to="/fitness" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Fitness Plans
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  AI Therapy Chat
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Wellness Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with the latest wellness tips and features.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="glass-input w-full px-4 py-2"
                required
              />
              <button 
                type="submit" 
                className="glass-button w-full px-4 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Serenity AI. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for a healthier world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;