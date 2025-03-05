import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, X } from 'lucide-react';
import FoodCard from '../components/Nutrition/FoodCard';
import FoodScanner from '../components/Nutrition/FoodScanner';
import { NutritionItem } from '../types';

const Nutrition: React.FC = () => {
  // Sample data
  const [foodItems] = useState<NutritionItem[]>([
    {
      id: '1',
      name: 'Grilled Chicken Salad',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 18,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      name: 'Avocado Toast',
      calories: 280,
      protein: 8,
      carbs: 25,
      fat: 16,
      image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      name: 'Protein Smoothie',
      calories: 220,
      protein: 20,
      carbs: 30,
      fat: 5,
      image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '4',
      name: 'Quinoa Bowl',
      calories: 420,
      protein: 15,
      carbs: 65,
      fat: 12,
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '5',
      name: 'Greek Yogurt with Berries',
      calories: 180,
      protein: 18,
      carbs: 20,
      fat: 2,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '6',
      name: 'Salmon with Vegetables',
      calories: 450,
      protein: 35,
      carbs: 10,
      fat: 28,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [mealItems, setMealItems] = useState<NutritionItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const handleAddToMeal = (food: NutritionItem) => {
    setMealItems([...mealItems, { ...food, id: Date.now().toString() }]);
  };

  const handleRemoveFromMeal = (id: string) => {
    setMealItems(mealItems.filter(item => item.id !== id));
  };

  const handleScanComplete = (foodName: string) => {
    // In a real app, this would use the scanned food data
    // For demo purposes, we'll add a mock item
    const newFood: NutritionItem = {
      id: Date.now().toString(),
      name: foodName,
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 10,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    };
    
    handleAddToMeal(newFood);
    setShowScanner(false);
  };

  const filteredFoodItems = foodItems.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalNutrition = () => {
    return mealItems.reduce(
      (totals, item) => {
        return {
          calories: totals.calories + item.calories,
          protein: totals.protein + item.protein,
          carbs: totals.carbs + item.carbs,
          fat: totals.fat + item.fat
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totals = calculateTotalNutrition();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nutrition Tracker
        </motion.h1>
        <motion.button 
          className="glass-button px-4 py-2 flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setShowScanner(!showScanner)}
        >
          {showScanner ? (
            <>
              <X size={18} />
              <span>Close Scanner</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Scan Food</span>
            </>
          )}
        </motion.button>
      </div>
      
      {showScanner ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FoodScanner onScanComplete={handleScanComplete} />
        </motion.div>
      ) : (
        <>
          {/* Current Meal */}
          {mealItems.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Current Meal</h2>
              
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                        <th className="pb-2">Food</th>
                        <th className="pb-2">Calories</th>
                        <th className="pb-2">Protein</th>
                        <th className="pb-2">Carbs</th>
                        <th className="pb-2">Fat</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealItems.map(item => (
                        <tr key={item.id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="py-3 pr-4">{item.name}</td>
                          <td className="py-3 pr-4">{item.calories}</td>
                          <td className="py-3 pr-4">{item.protein}g</td>
                          <td className="py-3 pr-4">{item.carbs}g</td>
                          <td className="py-3 pr-4">{item.fat}g</td>
                          <td className="py-3">
                            <button 
                              onClick={() => handleRemoveFromMeal(item.id)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t border-gray-200 dark:border-gray-700 font-medium">
                        <td className="py-3 pr-4">Total</td>
                        <td className="py-3 pr-4">{totals.calories}</td>
                        <td className="py-3 pr-4">{totals.protein}g</td>
                        <td className="py-3 pr-4">{totals.carbs}g</td>
                        <td className="py-3 pr-4">{totals.fat}g</td>
                        <td className="py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end">
                  <button className="glass-button px-4 py-2">
                    Save Meal
                  </button>
                </div>
              </div>
            </motion.section>
          )}
          
          {/* Food Library */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Food Library</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search foods..."
                    className="glass-input pl-10 pr-4 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="glass-input px-4 py-2 flex items-center space-x-2">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoodItems.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <FoodCard food={food} onAdd={handleAddToMeal} />
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Nutrition;