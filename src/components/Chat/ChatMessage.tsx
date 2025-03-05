import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <motion.div 
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isAi 
              ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mr-2' 
              : 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-300 ml-2'
          }`}
        >
          {isAi ? <Bot size={16} /> : <User size={16} />}
        </div>
        
        <div>
          <div 
            className={`p-3 rounded-lg ${
              isAi 
                ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none' 
                : 'bg-secondary-500 text-white rounded-tr-none'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${isAi ? 'text-left' : 'text-right'}`}>
            {message.timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;