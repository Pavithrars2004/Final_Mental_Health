import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';
import TherapySuggestionCard from '../components/Therapy/TherapySuggestionCard';
import { ChatMessage as ChatMessageType, TherapySuggestion } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! I\'m your AI wellness assistant. How are you feeling today?',
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [suggestions, setSuggestions] = useState<TherapySuggestion[]>([
    {
      id: '1',
      title: '5-Minute Breathing Exercise',
      description: 'A quick breathing technique to reduce anxiety and center yourself.',
      type: 'meditation',
      duration: 5,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      title: 'Gratitude Journaling',
      description: 'Write down three things you\'re grateful for to improve your mood.',
      type: 'journaling',
      duration: 10,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      title: 'Quick Stress Relief Stretch',
      description: 'A series of stretches designed to release tension in your body.',
      type: 'exercise',
      duration: 7,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponses = [
        "I understand how you're feeling. What specific aspects of this situation are most challenging for you?",
        "That's interesting. Could you tell me more about why you feel that way?",
        "I hear you. Have you tried any strategies to address this in the past?",
        "It sounds like you're going through a lot. Let's break this down into smaller, manageable parts.",
        "Thank you for sharing that with me. Based on what you've described, I think some mindfulness exercises might help."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: ChatMessageType = {
        id: Date.now().toString(),
        sender: 'ai',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);

      if (content.toLowerCase().includes('stress') || content.toLowerCase().includes('anxious')) {
        setSuggestions([
          {
            id: '4',
            title: 'Progressive Muscle Relaxation',
            description: 'A technique to reduce stress by tensing and relaxing muscle groups.',
            type: 'meditation',
            duration: 15,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          },
          {
            id: '5',
            title: 'Anxiety Management Techniques',
            description: 'Learn practical strategies to manage anxiety in the moment.',
            type: 'therapy',
            duration: 20,
            image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          },
          {
            id: '6',
            title: 'Calming Visualization',
            description: 'A guided visualization to help you find your calm place.',
            type: 'meditation',
            duration: 10,
            image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          }
        ]);
      }
    }, 1000);
  };

  const handleSelectSuggestion = (suggestion: TherapySuggestion) => {
    console.log('Selected suggestion:', suggestion);
    
    const aiMessage: ChatMessageType = {
      id: Date.now().toString(),
      sender: 'ai',
      content: `I've prepared the "${suggestion.title}" activity for you. This ${suggestion.duration}-minute ${suggestion.type} should help you feel better.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-screen">
      <motion.h1 
        className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI Therapy Chat
      </motion.h1>

      <div className="flex flex-grow gap-6 px-6 pb-6">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full max-h-[80vh] border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input - Ensuring it stays at the bottom */}
          <div className="border-t bg-gray-100 dark:bg-gray-900 p-3">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>

        {/* Suggestions Area */}
        <div className="hidden lg:block w-80">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-center">Personalized Suggestions</h2>
          <div className="space-y-4 overflow-y-auto max-h-[80vh]">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <TherapySuggestionCard 
                  suggestion={suggestion}
                  onSelect={handleSelectSuggestion}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
