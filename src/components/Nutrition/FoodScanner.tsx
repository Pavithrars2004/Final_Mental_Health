import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Check } from 'lucide-react';

interface FoodScannerProps {
  onScanComplete: (foodName: string) => void;
}

const FoodScanner: React.FC<FoodScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const startScanning = () => {
    setIsScanning(true);
    // In a real app, this would access the camera
    // For demo purposes, we'll simulate a scan after a delay
    setTimeout(() => {
      // Simulate a successful scan with a sample image
      setPreviewImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80');
    }, 2000);
  };

  const cancelScan = () => {
    setIsScanning(false);
    setPreviewImage(null);
  };

  const completeScan = () => {
    setIsScanning(false);
    // In a real app, this would process the image and identify the food
    onScanComplete('Mixed Salad Bowl');
    setPreviewImage(null);
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-xl font-semibold mb-4">Food Scanner</h3>
      
      {!isScanning && !previewImage && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Scan your food to get instant nutrition information
          </p>
          <motion.button
            className="glass-button px-6 py-3 flex items-center justify-center mx-auto space-x-2"
            whileTap={{ scale: 0.95 }}
            onClick={startScanning}
          >
            <Camera size={20} />
            <span>Start Scanning</span>
          </motion.button>
        </div>
      )}
      
      {isScanning && !previewImage && (
        <div className="relative">
          <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <div className="animate-pulse text-gray-500 dark:text-gray-400">
              <Camera size={48} />
              <p className="mt-2">Scanning...</p>
            </div>
          </div>
          <button
            className="absolute top-2 right-2 p-2 bg-gray-800/50 text-white rounded-full"
            onClick={cancelScan}
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      {previewImage && (
        <div className="relative">
          <img 
            src={previewImage} 
            alt="Scanned food" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
            <p className="text-white font-medium">Ready to analyze</p>
          </div>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              className="p-2 bg-red-500 text-white rounded-full"
              onClick={cancelScan}
            >
              <X size={20} />
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded-full"
              onClick={completeScan}
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodScanner;