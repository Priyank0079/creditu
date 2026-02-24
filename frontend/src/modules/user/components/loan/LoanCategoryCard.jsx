import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ icon: Icon, title, status, count, disabled = false }) => {
  return (
    <motion.div
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`bg-white rounded-[24px] p-5 border border-border transition-all relative ${disabled ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:shadow-soft hover:border-primary/20 cursor-pointer'
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-primary/5 text-primary'
          }`}>
          <Icon size={24} />
        </div>

        {status && (
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Completed' ? 'bg-trust/10 text-trust' :
              status === 'Action' ? 'bg-gold/10 text-gold' :
                'bg-gray-100 text-gray-500'
            }`}>
            {status}
          </div>
        )}
      </div>

      <div>
        <h4 className="font-bold text-primary mb-1 leading-tight">{title}</h4>
        {count && <p className="text-xs text-textSecondary font-medium">{count} available</p>}
        {disabled && <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">Coming Soon</p>}
      </div>

      {!disabled && (
        <div className="absolute bottom-4 right-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
        </div>
      )}
    </motion.div>
  );
};

export default CategoryCard;