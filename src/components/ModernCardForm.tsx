import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagneticEffect, useGlowEffect, useMatrixEffect } from '../hooks/useModernAnimations';

interface FormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}

interface ModernCardFormProps {
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  isProcessing: boolean;
}

const ModernCardForm: React.FC<ModernCardFormProps> = ({
  formData,
  onFormChange,
  isProcessing
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const matrixChars = useMatrixEffect();

  const { springX, springY, springScale, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.1);
  const { glowTransform, activateGlow, deactivateGlow } = useGlowEffect();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onFormChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    onFormChange('expiryDate', formatted);
  };

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;
    
    setCardTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeaveCard = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const InputField: React.FC<{
    label: string;
    field: keyof FormData;
    type?: string;
    placeholder: string;
    maxLength?: number;
    formatValue?: (value: string) => string;
  }> = ({ label, field, type = 'text', placeholder, maxLength, formatValue }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!formData[field]);

    const handleFocus = () => {
      setIsFocused(true);
      setFocusedField(field);
      activateGlow();
    };

    const handleBlur = () => {
      setIsFocused(false);
      setFocusedField(null);
      deactivateGlow();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = formatValue ? formatValue(e.target.value) : e.target.value;
      onFormChange(field, value);
      setHasValue(!!value);
    };

    return (
      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.label
          className={`absolute left-3 transition-all duration-300 pointer-events-none ${
            isFocused || hasValue
              ? 'text-neon-primary text-sm -top-2 bg-dark-card px-2'
              : 'text-text-secondary text-base top-4'
          }`}
          animate={{
            color: isFocused ? '#00ff88' : hasValue ? '#a1a1aa' : '#71717a'
          }}
        >
          {label}
        </motion.label>
        
        <motion.input
          type={type}
          value={formData[field]}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? '' : placeholder}
          maxLength={maxLength}
          disabled={isProcessing}
          className={`w-full px-4 py-4 bg-dark-elevated border-2 rounded-xl text-text-primary placeholder-transparent
            transition-all duration-300 focus:outline-none disabled:opacity-50
            ${isFocused 
              ? 'border-neon-primary shadow-glow' 
              : 'border-border-default hover:border-border-focus'
            }`}
          style={{
            boxShadow: isFocused ? glowTransform : undefined
          }}
          animate={{
            scale: isFocused ? 1.02 : 1,
            borderColor: isFocused ? '#00ff88' : '#2a2a2a'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Matrix effect overlay when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-neon-primary/10 to-transparent animate-scan" />
              {matrixChars.slice(0, 5).map((char, index) => (
                <motion.span
                  key={index}
                  className="absolute text-neon-primary text-xs font-mono"
                  style={{
                    left: `${10 + index * 15}%`,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 3D Card Preview */}
      <motion.div
        ref={cardRef}
        className="relative mb-8"
        onMouseMove={handleMouseMoveCard}
        onMouseLeave={handleMouseLeaveCard}
        style={{
          transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="glass-card rounded-2xl p-6 h-40 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #111111 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
          }}
          animate={{
            boxShadow: [
              '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              '0 35px 60px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 255, 136, 0.1)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Card chip */}
          <div className="absolute top-4 left-4 w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-sm" />
          </div>

          {/* Card number */}
          <div className="absolute top-4 right-4 text-text-primary font-mono text-lg">
            {formData.cardNumber || '•••• •••• •••• ••••'}
          </div>

          {/* Cardholder name */}
          <div className="absolute bottom-4 left-4 text-text-secondary text-sm">
            {formData.cardholderName || 'CARDHOLDER NAME'}
          </div>

          {/* Expiry date */}
          <div className="absolute bottom-4 right-4 text-text-secondary text-sm">
            {formData.expiryDate || 'MM/YY'}
          </div>

          {/* Holographic overlay */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 136, 0.1) 50%, transparent 70%)'
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-4">
        <InputField
          label="Card Number"
          field="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          formatValue={formatCardNumber}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Expiry Date"
            field="expiryDate"
            placeholder="MM/YY"
            maxLength={5}
            formatValue={formatExpiryDate}
          />
          
          <InputField
            label="CVV"
            field="cvv"
            placeholder="123"
            maxLength={4}
          />
        </div>

        <InputField
          label="Cardholder Name"
          field="cardholderName"
          placeholder="John Doe"
        />

        <InputField
          label="Email"
          field="email"
          type="email"
          placeholder="john@example.com"
        />
      </div>

      {/* Processing overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="absolute inset-0 bg-dark-primary/80 backdrop-blur-sm flex items-center justify-center rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="w-12 h-12 border-4 border-neon-primary/30 border-t-neon-primary rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-text-primary font-medium">Processing payment...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCardForm;