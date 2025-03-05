import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { TherapySuggestion } from '../../types';

interface TherapySuggestionCardProps {
  suggestion: TherapySuggestion;
  onSelect: (suggestion: TherapySuggestion) => void;
}

const TherapySuggestionCard: React.FC<TherapySuggestionCardProps> = ({ suggestion, onSelect }) => {
  const getTypeIcon = () => {
    switch (suggestion.type) {
      case 'meditation':
        return '🧘‍♀️';
      case 'exercise':
        return '🏃‍♂️';
      case 'journaling':
        return '📝';
      case 'therapy':
        return '💬';
      default:
        return '🌱';
    }
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {suggestion.image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={suggestion.image} 
            alt={suggestion.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{suggestion.title}</h3>
          <span className="text-2xl">{getTypeIcon()}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {suggestion.description}
        </p>
        
        <div className="flex justify-between items-center">
          {suggestion.duration && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-1" />
              <span>{suggestion.duration} min</span>
            </div>
          )}
          
          <button 
            onClick={() => onSelect(suggestion)}
            className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            <span className="mr-1">Start</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TherapySuggestionCard;