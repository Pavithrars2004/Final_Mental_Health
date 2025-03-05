export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  goal?: number;
  color: string;
}

export interface WearableDevice {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'energetic';
  sentiment: number; // -1 to 1
  tags: string[];
}

export interface NutritionItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
}

export interface FitnessActivity {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance' | 'other';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface TherapySuggestion {
  id: string;
  title: string;
  description: string;
  type: 'meditation' | 'exercise' | 'journaling' | 'therapy' | 'other';
  duration?: number;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    language: string;
  };
}