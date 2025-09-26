import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParticleSystem, useHolographicEffect, useMatrixEffect } from '../hooks/useModernAnimations';

interface CyberSuccessModalProps {
  onClose: () => void;
}

const CyberSuccessModal: React.FC<CyberSuccessModalProps> = ({ onClose }) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const matrixChars = useMatrixEffect();
  const { particles, createParticle } = useParticleSystem(30);
  const { holographicStyle } = useHolographicEffect();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCheckmark(true), 500);
    const timer2 = setTimeout(() => setShowParticles(true), 1000);
    const timer3 = setTimeout(() => onClose(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      rotateX: 15,
      transition: { duration: 0.5 }
    }
  };

  const successIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.6, duration: 0.5 }
    }
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 1, duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop with particle overlay */}
        <motion.div
          className="absolute inset-0 bg-dark-primary/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Digital rain background */}
        <div className="absolute inset-0 overflow-hidden">
          {matrixChars.slice(0, 20).map((char, index) => (
            <motion.div
              key={index}
              className="absolute text-neon-primary/20 text-xs font-mono"
              style={{
                left: `${5 + index * 5}%`,
                top: '0%'
              }}
              animate={{
                y: ['0%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>

        {/* Main modal */}
        <motion.div
          className="relative glass-card rounded-3xl p-8 max-w-md w-full text-center overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 255, 136, 0.2)'
          }}
        >
          {/* Holographic background */}
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
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Success icon */}
          <motion.div
            className="relative z-10 mb-6"
            variants={successIconVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="w-20 h-20 mx-auto relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-neon-primary/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Main success circle */}
              <motion.div
                className="w-full h-full rounded-full bg-gradient-to-br from-neon-primary to-neon-success flex items-center justify-center relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 136, 0.5)',
                    '0 0 40px rgba(0, 255, 136, 0.8)',
                    '0 0 20px rgba(0, 255, 136, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Checkmark */}
                <AnimatePresence>
                  {showCheckmark && (
                    <motion.svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>

                {/* Scanning line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
            </motion.div>
          </motion.div>

          {/* Success text */}
          <motion.div
            className="relative z-10"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl font-bold mb-4"
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
              Payment Successful!
            </motion.h2>

            <motion.p
              className="text-text-secondary text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Your transaction has been processed securely
            </motion.p>

            <motion.div
              className="text-sm text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          <AnimatePresence>
            {showParticles && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                variants={particleVariants}
                initial="hidden"
                animate="visible"
              >
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-neon-primary rounded-full"
                    style={{
                      left: particle.x,
                      top: particle.y,
                      opacity: particle.life
                    }}
                    animate={{
                      y: [particle.y, particle.y - 50],
                      opacity: [particle.life, 0]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 border-2 border-neon-primary/30 rotate-45"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 border-2 border-neon-secondary/30 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CyberSuccessModal;