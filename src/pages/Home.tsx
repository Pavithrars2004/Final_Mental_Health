import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Activity, Utensils, Heart, MessageSquare } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl -z-10" />
        <div className="glass-card p-8 md:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Your AI Wellness Companion
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Experience personalized health tracking, mood analysis, and AI-driven wellness insights to help you live your best life.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/dashboard" 
                  className="glass-button px-6 py-3 text-center flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Wellness visualization"
                className="rounded-xl w-full h-auto shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-sm font-medium text-gray-800 dark:text-white">AI-Generated Message</div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Your sleep quality has improved by 15% this week. Keep it up!"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Wellness Features
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our platform combines cutting-edge AI technology with holistic wellness practices to help you achieve optimal health.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Brain className="text-primary-500" size={24} />}
            title="AI Health Analysis"
            description="Get personalized insights and recommendations based on your health data and daily habits."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Activity className="text-primary-500" size={24} />}
            title="Wearable Integration"
            description="Connect your Fitbit, Apple Health, or Google Fit to track stress, sleep, and activity levels."
            delay={0.2}
          />
          <FeatureCard 
            icon={<MessageSquare className="text-primary-500" size={24} />}
            title="AI Therapy Chat"
            description="Chat with our AI therapist for mood analysis, journaling, and personalized therapy suggestions."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Utensils className="text-primary-500" size={24} />}
            title="Nutrition Tracking"
            description="Scan food items for instant nutrition insights and get AI-generated meal recommendations."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Heart className="text-primary-500" size={24} />}
            title="Fitness Plans"
            description="Receive customized workout plans based on your goals, preferences, and health status."
            delay={0.5}
          />
          <FeatureCard 
            icon={<Brain className="text-primary-500" size={24} />}
            title="Health Reports"
            description="Get comprehensive health reports with actionable insights to improve your wellbeing."
            delay={0.6}
          />
        </div>
      </section>
      
      {/* Wearable Integration Section */}
      <section className="glass-card p-8 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Seamless Wearable Integration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect your favorite wearable devices to track your health metrics in real-time. Our AI analyzes your data to provide personalized insights and recommendations.
            </p>
            <div className="flex space-x-4 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Fitbit_logo.svg/1200px-Fitbit_logo.svg.png" alt="Fitbit" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Health.svg/1200px-Apple_Health.svg.png" alt="Apple Health" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Google_Fit_2018_Logo.svg/1200px-Google_Fit_2018_Logo.svg.png" alt="Google Fit" className="h-8 object-contain" />
            </div>
            <Link 
              to="/connect-devices" 
              className="glass-button px-6 py-3 inline-flex items-center space-x-2"
            >
              <span>Connect Your Devices</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Wearable devices"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard 
            quote="The AI-powered insights have completely transformed my approach to wellness. I've never felt better!"
            name="Sarah Johnson"
            title="Yoga Instructor"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            delay={0.1}
          />
          <TestimonialCard 
            quote="I love how the app connects with my Apple Watch and provides personalized recommendations based on my activity."
            name="Michael Chen"
            title="Software Engineer"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            delay={0.2}
          />
          <TestimonialCard 
            quote="The AI therapy chat has been a game-changer for my mental health. It's like having a therapist in my pocket."
            name="Emily Rodriguez"
            title="Marketing Director"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            delay={0.3}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="glass-card p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Your Wellness Journey Today
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of users who have transformed their health and wellbeing with our AI-powered platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/dashboard" 
              className="glass-button px-8 py-4 text-lg inline-flex items-center space-x-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="glass-card p-6 micro-interaction"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, image, delay }) => {
  return (
    <motion.div 
      className="glass-card p-6 micro-interaction"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
    </motion.div>
  );
};

export default Home;