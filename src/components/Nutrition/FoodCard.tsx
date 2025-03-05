import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface Meal {
  name: string;
  calories: string; // e.g., "250-300"
  carbs: string; // e.g., "25-30g"
}

interface FoodCardProps {
  meal: Meal;
  onAdd: (meal: Meal) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ meal, onAdd }) => {
  return (
    <motion.div 
      className="glass-card overflow-hidden micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
          alt={meal.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{meal.name}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
            <div className="font-bold">{meal.calories}</div>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Carbs</div>
            <div className="font-bold">{meal.carbs}</div>
          </div>
        </div>
        
        <button 
          onClick={() => onAdd(meal)}
          className="glass-button w-full py-2 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add to Meal</span>
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;