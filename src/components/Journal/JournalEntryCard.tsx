import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit, Trash, Smile, Meh, Frown, AlertCircle, Zap } from 'lucide-react';
import { JournalEntry } from '../../types';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onEdit, onDelete }) => {
  const getMoodIcon = () => {
    switch (entry.mood) {
      case 'happy':
        return <Smile size={20} className="text-yellow-500" />;
      case 'neutral':
        return <Meh size={20} className="text-blue-500" />;
      case 'sad':
        return <Frown size={20} className="text-indigo-500" />;
      case 'anxious':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'energetic':
        return <Zap size={20} className="text-orange-500" />;
      default:
        return null;
    }
  };

  const getSentimentColor = () => {
    if (entry.sentiment > 0.3) return 'bg-green-500';
    if (entry.sentiment < -0.3) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <motion.div 
      className="glass-card p-5 micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(entry.id)}
            className="p-1 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(entry.id)}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-3">
        {getMoodIcon()}
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div 
            className={`h-full rounded-full ${getSentimentColor()}`}
            style={{ width: `${(entry.sentiment + 1) * 50}%` }}
          />
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{entry.content}</p>
      
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JournalEntryCard;