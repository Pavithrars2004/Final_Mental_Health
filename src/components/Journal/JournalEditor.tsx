import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Tag, X, Mic } from 'lucide-react';
import MoodSelector from './MoodSelector';
import { JournalEntry } from '../../types';


interface JournalEditorProps {
  onSave: (entry: Omit<JournalEntry, 'id' | 'date' | 'sentiment'>) => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood'] | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (content.trim() && mood) {
      // Log the user's input to the console
      console.log('User Input:', {
        content,
        mood,
        tags
      });

      try {
        // Send the journal entry to the API
        const response = await fetch('http://127.0.0.1:5000/analyze_journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: content, // Send the journal entry text
          }),
        });

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log('API Response:', data); // Log the API response
      } catch (error) {
        console.error('Error sending data to the API:', error);
      }

      // Call the `onSave` prop to pass data to the parent component (if needed)
      onSave({
        content,
        mood,
        tags
      });

      // Reset the form
      setContent('');
      setMood(null);
      setTags([]);
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event: any) => console.error('Speech recognition error:', event);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setContent(prevContent => prevContent + ' ' + transcript);
    };

    recognition.start();
  };

  return (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">New Journal Entry</h2>
      
      <MoodSelector selectedMood={mood} onSelect={setMood} />
      
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          className="glass-input w-full h-40 p-4 resize-none"
        />
      </div>

      {/* Voice Input Button */}
      <div className="mb-6">
        <button 
          onClick={startVoiceRecognition} 
          className={`glass-button px-4 py-2 flex items-center ${isRecording ? 'bg-red-500' : ''}`}
        >
          <Mic size={18} className="mr-2" />
          {isRecording ? 'Listening...' : 'Start Recording'}
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <div 
              key={tag} 
              className="flex items-center bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm"
            >
              <span>{tag}</span>
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-primary-500 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add tags (press Enter)"
            className="glass-input flex-1 px-4 py-2"
          />
          <button 
            onClick={handleAddTag}
            className="ml-2 glass-button px-4 py-2 flex items-center"
            disabled={!tagInput.trim()}
          >
            <Tag size={16} className="mr-2" />
            Add
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="glass-button px-6 py-2 flex items-center"
          disabled={!content.trim() || !mood}
        >
          <Save size={18} className="mr-2" />
          Save Entry
        </button>
      </div>
    </motion.div>
  );
};

export default JournalEditor;