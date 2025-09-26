import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernCardForm from './ModernCardForm';
import PremiumPaymentButton from './PremiumPaymentButton';
import CyberSuccessModal from './CyberSuccessModal';
import SecurityBadges from './SecurityBadges';
import { useBreathingAnimation, useHolographicEffect } from '../hooks/useModernAnimations';

const DarkPaymentDemo: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });

  const { breathingScale, breathingOpacity } = useBreathingAnimation(4);
  const { holographicStyle } = useHolographicEffect();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main glassmorphism card */}
        <motion.div
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
          variants={cardVariants}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 136, 0.1)',
            transformStyle: 'preserve-3d'
          }}
          whileHover={{
            y: -8,
            rotateX: 5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Holographic background overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={holographicStyle}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, #00ff88, #8b5cf6, #00ff88)',
              padding: '2px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor'
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Header */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #00ff88, #8b5cf6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Secure Payment
            </motion.h1>
            
            <motion.p
              className="text-text-secondary text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Complete your transaction with confidence
            </motion.p>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ModernCardForm
              formData={formData}
              onFormChange={handleFormChange}
              isProcessing={isProcessing}
            />
          </motion.div>

          {/* Payment Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PremiumPaymentButton
              onClick={handlePayment}
              isProcessing={isProcessing}
              disabled={!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName}
            />
          </motion.div>

          {/* Security Badges */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SecurityBadges />
          </motion.div>

          {/* Floating particles inside card */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-neon-primary rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-8 left-8 w-1 h-1 bg-neon-secondary rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <CyberSuccessModal
              onClose={() => setShowSuccess(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DarkPaymentDemo;