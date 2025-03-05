// JournalContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { JournalEntry } from '../src/types';

interface JournalContextType {
  entries: JournalEntry[];
  setEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

interface JournalProviderProps {
  children: React.ReactNode;
}

export const JournalProvider: React.FC<JournalProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  return (
    <JournalContext.Provider value={{ entries, setEntries }}>
      {children}
    </JournalContext.Provider>
  );
};
