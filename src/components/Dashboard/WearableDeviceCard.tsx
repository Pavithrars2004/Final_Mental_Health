import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { WearableDevice } from '../../types';

interface WearableDeviceCardProps {
  device: WearableDevice;
  onConnect: (id: string) => void;
  onSync: (id: string) => void;
}

const WearableDeviceCard: React.FC<WearableDeviceCardProps> = ({ 
  device, 
  onConnect,
  onSync
}) => {
  return (
    <motion.div 
      className="glass-card p-4 micro-interaction"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <span dangerouslySetInnerHTML={{ __html: device.icon }} />
          </div>
          <h3 className="font-medium">{device.name}</h3>
        </div>
        {device.connected ? (
          <CheckCircle size={18} className="text-green-500" />
        ) : (
          <XCircle size={18} className="text-red-500" />
        )}
      </div>
      
      {device.connected ? (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last synced: {device.lastSync || 'Never'}
          </div>
          <button 
            onClick={() => onSync(device.id)}
            className="w-full py-2 px-4 text-sm glass-button flex items-center justify-center space-x-2"
          >
            <RefreshCw size={14} />
            <span>Sync Now</span>
          </button>
        </div>
      ) : (
        <button 
          onClick={() => onConnect(device.id)}
          className="w-full py-2 px-4 text-sm glass-button"
        >
          Connect
        </button>
      )}
    </motion.div>
  );
};

export default WearableDeviceCard;