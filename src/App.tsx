import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Chat from './pages/Chat';
import Nutrition from './pages/Nutrition';
import Fitness from './pages/Fitness';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="chat" element={<Chat />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="fitness" element={<Fitness />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;