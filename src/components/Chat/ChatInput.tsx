import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Image, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => prev + ' ' + transcript);
      };

      speechRecognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(speechRecognition);
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (recognition) {
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsRecording(!isRecording);
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="glass-card p-3">
      <div className="flex items-end space-x-2">
        <button className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
          <Paperclip size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
          <Image size={20} />
        </button>
        
        <div className="flex-1 glass-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or speak your message..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none p-3 max-h-32"
            rows={1}
          />
        </div>
        
        <motion.button
          className={`p-3 rounded-full ${
            isRecording 
              ? 'bg-red-500 text-white' 
              : 'text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400'
          } transition-colors`}
          whileTap={{ scale: 0.9 }}
          onClick={toggleRecording}
        >
          <Mic size={20} />
        </motion.button>
        
        <motion.button
          className="p-3 rounded-full bg-primary-500 text-white"
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
