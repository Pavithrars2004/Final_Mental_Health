import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Plus, ArrowRight } from 'lucide-react';
import ActivityCard from '../components/Fitness/ActivityCard';
import { FitnessActivity } from '../types';

const Fitness: React.FC = () => {
  // Sample data
  const [activities] = useState<FitnessActivity[]>([
    {
      id: '1',
      name: 'Morning Run',
      duration: 30,
      calories: 320,
      date: 'May 15, 2025',
      type: 'cardio'
    },
    {
      id: '2',
      name: 'Strength Training',
      duration: 45,
      calories: 280,
      date: 'May 14, 2025',
      type: 'strength'
    },
    {
      id: '3',
      name: 'Yoga Session',
      duration: 60,
      calories: 180,
      date: 'May 13, 2025',
      type: 'flexibility'
    },
    {
      id: '4',
      name: 'HIIT Workout',
      duration: 25,
      calories: 350,
      date: 'May 12, 2025',
      type: 'cardio'
    },
    {
      id: '5',
      name: 'Balance Training',
      duration: 20,
      calories: 120,
      date: 'May 11, 2025',
      type: 'balance'
    },
    {
      id: '6',
      name: 'Swimming',
      duration: 40,
      calories: 400,
      date: 'May 10, 2025',
      type: 'cardio'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredActivities = activeFilter 
    ? activities.filter(activity => activity.type === activeFilter)
    : activities;

  const calculateTotals = () => {
    return activities.reduce(
      (totals, activity) => {
        return {
          duration: totals.duration + activity.duration,
          calories: totals.calories + activity.calories,
          count: totals.count + 1
        };
      },
      { duration: 0, calories: 0, count: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fitness Tracker
        </motion.h1>
        <motion.div 
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Calendar size={16} />
          <span>This Week</span>
        </motion.div>
      </div>
      
      {/* Weekly Summary */}
      <motion.section 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Weekly Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-4 text-center">
            <div className="text-4xl font-bold text-primary-500">{totals.count}</div>
            <div className="text-gray-600 dark:text-gray-400">Workouts</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-4xl font-bold text-primary-500">{totals.duration}</div>
            <div className="text-gray-600 dark:text-gray-400">Minutes</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-4xl font-bold text-primary-500">{totals.calories}</div>
            <div className="text-gray-600 dark:text-gray-400">Calories</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Distribution</h3>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
            <div className="h-full bg-red-500" style={{ width: '40%' }}></div>
            <div className="h-full bg-blue-500" style={{ width: '25%' }}></div>
            <div className="h-full bg-green-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-purple-500" style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Cardio</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>Strength</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Flexibility</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
              <span>Balance</span>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* AI Recommendation */}
      <motion.section 
        className="glass-card p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
              <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
              <path d="M12 12m0 1v5"></path>
              <path d="M9 9h6"></path>
              <path d="M16 19h6"></path>
              <path d="M19 16v6"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">AI Workout Recommendation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Based on your recent activities, I recommend adding more strength training to your routine. 
              This will help balance your cardio-heavy workouts and improve overall fitness.
            </p>
            <button className="glass-button px-4 py-2 flex items-center space-x-2">
              <span>View Recommended Workout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.section>
      
      {/* Activity List */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Activities</h2>
          <div className="flex space-x-2">
            <div className="flex space-x-1">
              {['cardio', 'strength', 'flexibility', 'balance', 'other'].map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    activeFilter === type
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveFilter(activeFilter === type ? null : type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <button className="glass-button-secondary px-4 py-2 flex items-center space-x-2">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Activity</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <ActivityCard activity={activity} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fitness;