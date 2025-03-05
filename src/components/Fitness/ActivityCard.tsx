import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Calendar } from 'lucide-react';
import { FitnessActivity } from '../../types';

interface ActivityCardProps {
  activity: FitnessActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'cardio':
        return '🏃‍♂️';
      case 'strength':
        return '💪';
      case 'flexibility':
        return '🧘‍♀️';
      case 'balance':
        return '⚖️';
      default:
        return '🏋️‍♀️';
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'cardio':
        return 'from-red-500 to-orange-500';
      case 'strength':
        return 'from-blue-500 to-indigo-500';
      case 'flexibility':
        return 'from-green-500 to-teal-500';
      case 'balance':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`h-2 bg-gradient-to-r ${getActivityColor()}`} />
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-lg">{activity.name}</h3>
          <span className="text-2xl">{getActivityIcon()}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{activity.duration} minutes</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Flame size={16} className="mr-2" />
            <span>{activity.calories} calories</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{activity.date}</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
            {activity.type}
          </span>
          <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;