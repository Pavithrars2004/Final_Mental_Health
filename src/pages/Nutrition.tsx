import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, X } from 'lucide-react';
import FoodCard from '../components/Nutrition/FoodCard';
import FoodScanner from '../components/Nutrition/FoodScanner';
import { NutritionItem } from '../types';

interface Meal {
  name: string;
  calories: string;
  carbs: string;
}

interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

interface WeeklyMealPlan {
  [day: string]: DayMeals;
}

interface ApiResponse {
  weeklyMealPlan: WeeklyMealPlan;
}

const Nutrition: React.FC = () => {
  const [foodItems] = useState<NutritionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mealItems, setMealItems] = useState<NutritionItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<WeeklyMealPlan | null>(null);

  useEffect(() => {
    // Fetch diet plan data from the API
    fetch('http://127.0.0.1:5000/retrieve_diet_plan')
      .then(response => response.json())
      .then((data: ApiResponse[]) => {
        console.log('Diet Plan Data:', data[0].weeklyMealPlan);
        setWeeklyMealPlan(data[0].weeklyMealPlan);
      })
      .catch(error => {
        console.error('Error fetching diet plan:', error);
      });
  }, []);

  const handleAddToMeal = (food: NutritionItem) => {
    setMealItems([...mealItems, { ...food, id: Date.now().toString() }]);
  };

  const handleRemoveFromMeal = (id: string) => {
    setMealItems(mealItems.filter(item => item.id !== id));
  };

  const handleScanComplete = (foodName: string) => {
    const newFood: NutritionItem = {
      id: Date.now().toString(),
      name: foodName,
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 10,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
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
          fat: totals.fat + item.fat,
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
            
            {/* Display Weekly Meal Plan */}
            {weeklyMealPlan ? (
              <div className="space-y-8">
                {Object.entries(weeklyMealPlan).map(([day, meals]) => (
                  <div key={day}>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{day}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(meals).map(([mealType, meal]) => (
                        <motion.div
                          key={`${day}-${mealType}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FoodCard 
                            meal={{
                              ...meal,
                              id: `${day}-${mealType}`,
                              
                            }}
                            onAdd={() => handleAddToMeal({
                              id: Date.now().toString(),
                              name: meal.name,
                              calories: parseInt(meal.calories.split('-')[0]), // Extract lower bound of calories
                              protein: 0, // Placeholder, as protein data is not provided
                              carbs: parseInt(meal.carbs.replace('g', '')), // Remove 'g' and convert to number
                              fat: 0, // Placeholder, as fat data is not provided
                              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                            })}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No meal plan available. Please check back later.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Nutrition;