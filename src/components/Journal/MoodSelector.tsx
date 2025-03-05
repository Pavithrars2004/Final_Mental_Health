import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, AlertCircle, Zap } from 'lucide-react';

type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'energetic';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  const moods: { type: Mood; icon: React.ReactNode; label: string; color: string }[] = [
    { 
      type: 'happy', 
      icon: <Smile size={24} />, 
      label: 'Happy', 
      color: 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300' 
    },
    { 
      type: 'neutral', 
      icon: <Meh size={24} />, 
      label: 'Neutral', 
      color: 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300' 
    },
    { 
      type: 'sad', 
      icon: <Frown size={24} />, 
      label: 'Sad', 
      color: 'bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300' 
    },
    { 
      type: 'anxious', 
      icon: <AlertCircle size={24} />, 
      label: 'Anxious', 
      color: 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300' 
    },
    { 
      type: 'energetic', 
      icon: <Zap size={24} />, 
      label: 'Energetic', 
      color: 'bg-orange-100 text-orange-500 dark:bg-orange-900 dark:text-orange-300' 
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">How are you feeling today?</h3>
      <div className="flex flex-wrap gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.type}
            className={`flex flex-col items-center p-3 rounded-lg ${mood.color} ${
              selectedMood === mood.type 
                ? 'ring-2 ring-primary-500 dark:ring-primary-400' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => onSelect(mood.type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mood.icon}
            <span className="mt-1 text-sm">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;