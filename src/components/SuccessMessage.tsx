import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessMessageProps {
  show: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  show, 
  message, 
  onClose, 
  duration = 5000 
}) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className="fixed top-6 right-6 z-[100] min-w-[320px]"
        >
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-[0_8px_32px_rgba(16,185,129,0.1)] rounded-2xl p-4 flex items-center gap-4">
            {/* Success Icon with Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-20 rounded-full" />
              <div className="relative w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">System Operation Success</h4>
              <p className="text-sm font-bold text-slate-800 leading-tight">{message}</p>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Animated Progress Bar */}
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-emerald-500/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
