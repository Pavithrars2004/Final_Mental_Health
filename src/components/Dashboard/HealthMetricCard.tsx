import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { HealthMetric } from '../../types';

interface HealthMetricCardProps {
  metric: HealthMetric;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({ metric }) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUp size={16} className="text-green-500" />;
      case 'down':
        return <ArrowDown size={16} className="text-red-500" />;
      case 'stable':
      default:
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getProgressPercentage = () => {
    if (!metric.goal) return 100;
    return Math.min(100, (metric.value / metric.goal) * 100);
  };

  return (
    <motion.div 
      className="glass-card p-4 micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">{metric.name}</h3>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="flex items-end space-x-2 mb-3">
        <span className="text-2xl font-bold">{metric.value}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{metric.unit}</span>
      </div>
      
      {metric.goal && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Progress</span>
            <span>{metric.value} / {metric.goal} {metric.unit}</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: metric.color }}
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HealthMetricCard;