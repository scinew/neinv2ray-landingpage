import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagneticEffect, useRippleEffect, useParticleSystem } from '../hooks/useModernAnimations';

interface PremiumPaymentButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

const PremiumPaymentButton: React.FC<PremiumPaymentButtonProps> = ({
  onClick,
  isProcessing,
  disabled
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { springX, springY, springScale, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.2);
  const { ripples, createRipple } = useRippleEffect();
  const { particles, createParticle } = useParticleSystem(15);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isProcessing) return;
    
    createRipple(e);
    onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveButton = () => {
    setIsHovered(false);
    handleMouseLeave();
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)',
      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 15px 40px rgba(0, 255, 136, 0.4)',
      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
      transition: { duration: 0.3, ease: "easeOut" }
    },
    pressed: {
      scale: 0.95,
      boxShadow: '0 5px 20px rgba(0, 255, 136, 0.3)',
      background: 'linear-gradient(135deg, #00cc6a 0%, #00aa55 100%)',
      transition: { duration: 0.1 }
    },
    disabled: {
      scale: 1,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
      transition: { duration: 0.3 }
    },
    processing: {
      scale: 1,
      boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
      background: 'linear-gradient(135deg, #00ff88 0%, #8b5cf6 100%)',
      transition: { duration: 0.5 }
    }
  };

  const getButtonState = () => {
    if (disabled) return 'disabled';
    if (isProcessing) return 'processing';
    if (isPressed) return 'pressed';
    if (isHovered) return 'hover';
    return 'idle';
  };

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        className={`relative w-full py-4 px-8 rounded-2xl font-semibold text-lg text-white
          transition-all duration-300 overflow-hidden group
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${isProcessing ? 'cursor-wait' : ''}`}
        style={{
          x: springX,
          y: springY,
          scale: springScale
        }}
        variants={buttonVariants}
        animate={getButtonState()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveButton}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        disabled={disabled || isProcessing}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #00ff88 0%, #8b5cf6 50%, #00ff88 100%)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Glassmorphism overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          animate={{
            opacity: isHovered ? 0.2 : 0.1
          }}
        />

        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border-2 border-white/30"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Particle effects */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                opacity: particle.life
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          ))}
        </AnimatePresence>

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center">
          {isProcessing ? (
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Processing...</span>
            </motion.div>
          ) : (
            <motion.span
              className="flex items-center space-x-2"
              animate={{
                x: isHovered ? [0, 5, 0] : 0
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0
              }}
            >
              <span>Complete Payment</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  x: isHovered ? [0, 3, 0] : 0
                }}
                transition={{
                  duration: 0.5,
                  repeat: isHovered ? Infinity : 0
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.span>
          )}
        </div>

        {/* Scanning line effect */}
        <AnimatePresence>
          {isHovered && !isProcessing && (
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)'
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Magnetic attraction particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-primary rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  x: [0, -20, 0],
                  y: [0, -10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumPaymentButton;