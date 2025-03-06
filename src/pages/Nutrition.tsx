import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import FoodCard from '../components/Nutrition/FoodCard';
import { X } from 'lucide-react';

interface Meal {
  meal: string; // Breakfast, Lunch, Dinner
  recipe: string; // Actual meal name
  calories: string; // e.g., "250-300"
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

const Nutrition: React.FC = () => {
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<DayPlan[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [addedMeals, setAddedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/retrieve_diet_plan');
        console.log('Fetched meal plan:', response.data);

        if (response.data.length > 0 && response.data[0].weeklyMealPlan) {
          setWeeklyMealPlan(response.data[response.data.length-1].weeklyMealPlan);
        } else {
          setError('Invalid meal plan format received.');
        }
      } catch (err) {
        console.error('Error fetching meal plan:', err);
        setError('Failed to load meal plan. Please try again later.');
      }
    };

    fetchMealPlan();
  }, []);

  // Function to add a meal to today's plan
  const handleAddToMeal = (meal: Meal) => {
    setAddedMeals((prevMeals) => [meal, ...prevMeals]);
  };

  // Function to remove a meal from today's plan
  const handleRemoveMeal = (index: number) => {
    setAddedMeals((prevMeals) => prevMeals.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Your Weekly Meal Plan 🍽️
      </h2>

      {/* Meal Plan for Today Section */}
      {addedMeals.length > 0 && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Meal Plan for Today 📅
          </h3>
          <div className="space-y-4">
            {addedMeals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700"
              >
                <span className="text-lg font-medium text-gray-800 dark:text-white">
                  {meal.meal} - {meal.recipe} ({meal.calories} cal)
                </span>
                <button
                  onClick={() => handleRemoveMeal(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search meals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* Weekly Meal Plan */}
      {weeklyMealPlan ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weeklyMealPlan
            .filter((dayPlan) =>
              dayPlan.meals.some((meal) =>
                meal.recipe.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
            .map((dayPlan) => (
              <motion.div
                key={dayPlan.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-2 rounded-lg">
                  {dayPlan.day}
                </h3>

                {/* Meal Sections */}
                {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
                  <div
                    key={mealType}
                    className="p-4 mb-4 rounded-xl"
                    style={{
                      background:
                        mealType === 'Breakfast'
                          ? 'rgba(255, 223, 186, 0.3)' // Light Orange
                          : mealType === 'Lunch'
                          ? 'rgba(186, 255, 201, 0.3)' // Light Green
                          : 'rgba(186, 220, 255, 0.3)', // Light Blue
                    }}
                  >
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {mealType === 'Breakfast' ? '🍳' : mealType === 'Lunch' ? '🍛' : '🌙'}{' '}
                      {mealType}
                    </h4>
                    {dayPlan.meals
                      .filter((meal) => meal.meal.toLowerCase() === mealType.toLowerCase())
                      .map((meal, index) => (
                        <FoodCard
                          key={`${dayPlan.day}-${mealType}-${index}`}
                          meal={{
                            name: meal.recipe,
                            calories: meal.calories,
                            carbs: 'N/A',
                          }}
                          onAdd={() => handleAddToMeal(meal)}
                        />
                      ))}
                  </div>
                ))}
              </motion.div>
            ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading your personalized meal plan...</p>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
