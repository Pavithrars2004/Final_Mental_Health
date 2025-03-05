import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Search } from 'lucide-react';
import JournalEditor from '../components/Journal/JournalEditor';
import JournalEntryCard from '../components/Journal/JournalEntryCard';
import { JournalEntry } from '../types';

const Journal: React.FC = () => {
  // Sample data
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: 'May 15, 2025',
      content: 'Today was a productive day. I completed all my tasks at work and had time for a 30-minute meditation session. Feeling accomplished and balanced.',
      mood: 'happy',
      sentiment: 0.8,
      tags: ['work', 'meditation', 'productive']
    },
    {
      id: '2',
      date: 'May 14, 2025',
      content: 'Feeling a bit overwhelmed with the upcoming project deadlines. Need to practice more mindfulness to manage stress better.',
      mood: 'anxious',
      sentiment: -0.4,
      tags: ['work', 'stress', 'deadlines']
    },
    {
      id: '3',
      date: 'May 12, 2025',
      content: 'Had a great workout session today. The new fitness routine suggested by the AI is challenging but enjoyable. Energy levels are improving.',
      mood: 'energetic',
      sentiment: 0.7,
      tags: ['fitness', 'energy', 'workout']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const handleSaveEntry = (newEntry: Omit<JournalEntry, 'id' | 'date' | 'sentiment'>) => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      sentiment: Math.random() * 2 - 1, // Mock sentiment analysis (-1 to 1)
      ...newEntry
    };
    
    setEntries([entry, ...entries]);
  };

  const handleEditEntry = (id: string) => {
    setEditingEntryId(id);
    // In a real app, this would open the editor with the entry content
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      
      {/* Journal Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <JournalEntryCard 
                entry={entry} 
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No journal entries found. Start writing to see your entries here.</p>
          </div>
        )}
      </div>
      
      {/* Sentiment Analysis */}
      {entries.length > 0 && (
        <motion.section 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Mood & Sentiment Analysis</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weekly Mood Trend</h3>
              <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const colors = [
                    'bg-yellow-400', // happy
                    'bg-blue-400',   // neutral
                    'bg-indigo-400', // sad
                    'bg-red-400',    // anxious
                    'bg-green-400',  // energetic
                    'bg-yellow-400', // happy
                    'bg-blue-400',   // neutral
                  ];
                  return (
                    <div key={day} className="flex-1 flex flex-col">
                      <div className={`flex-1 ${colors[index]}`}></div>
                      <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">{day.substring(0, 3)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common Emotions</h3>
              <div className="flex flex-wrap gap-2">
                {['Happiness', 'Anxiety', 'Accomplishment', 'Stress', 'Energy', 'Focus', 'Gratitude'].map((emotion, index) => {
                  const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-sm', 'text-xs'];
                  return (
                    <span key={emotion} className={`${sizes[index]} font-medium text-primary-500 dark:text-primary-400`}>
                      {emotion}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Insight</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Based on your journal entries, you seem to experience higher stress levels on workdays, particularly when facing deadlines. 
                Consider scheduling short meditation breaks during your workday to manage stress more effectively.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Journal;