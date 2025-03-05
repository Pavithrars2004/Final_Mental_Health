import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Search } from 'lucide-react';
import JournalEditor from '../components/Journal/JournalEditor';
import { JournalEntry } from '../types';
const Journal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveEntry = (newEntry: Omit<JournalEntry, 'id' | 'date' | 'sentiment'>) => {
    // Log the user's input to the console
    console.log(searchTerm, newEntry);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Journal
        </motion.h1>
        <motion.div 
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Calendar size={16} />
          <span>Today, {new Date().toLocaleDateString()}</span>
        </motion.div>
      </div>
      
      {/* Journal Editor */}
      <JournalEditor onSave={handleSaveEntry} />
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search entries or tags..."
            className="glass-input pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="glass-input px-4 py-2 flex items-center justify-center space-x-2">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>
      
      {/* No entries message */}
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No journal entries found. Start writing to see your entries here.</p>
      </div>
    </div>
  );
};

export default Journal;
