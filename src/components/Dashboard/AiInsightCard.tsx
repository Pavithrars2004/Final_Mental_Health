import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AiInsightCardProps {
  insight: string;
  date: string;
}

const AiInsightCard: React.FC<AiInsightCardProps> = ({ insight, date }) => {
  return (
    <motion.div 
      className="glass-card p-5 micro-interaction"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
          <Brain size={20} className="text-primary-500" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-white">AI Insight</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AiInsightCard;