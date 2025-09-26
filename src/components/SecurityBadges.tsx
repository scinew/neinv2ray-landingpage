import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCyberScan, useHolographicEffect } from '../hooks/useModernAnimations';

const SecurityBadges: React.FC = () => {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);
  const { scanPosition, isScanning, startScan } = useCyberScan();
  const { holographicStyle } = useHolographicEffect();

  const securityFeatures = [
    {
      icon: '🔒',
      title: 'SSL Encrypted',
      description: '256-bit encryption',
      color: 'neon-primary'
    },
    {
      icon: '🛡️',
      title: 'PCI Compliant',
      description: 'Secure standards',
      color: 'neon-success'
    },
    {
      icon: '⚡',
      title: 'Instant Processing',
      description: 'Real-time verification',
      color: 'neon-info'
    },
    {
      icon: '🔐',
      title: 'Fraud Protection',
      description: 'AI-powered security',
      color: 'neon-warning'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * securityFeatures.length);
      setActiveBadge(randomIndex);
      startScan();
      
      setTimeout(() => {
        setActiveBadge(null);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, [securityFeatures.length, startScan]);

  const badgeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    },
    active: {
      scale: 1.1,
      y: -8,
      boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    idle: { rotate: 0, scale: 1 },
    active: { 
      rotate: [0, 10, -10, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    scanning: {
      rotate: 360,
      transition: { duration: 2, ease: "linear" }
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {securityFeatures.map((feature, index) => {
        const isActive = activeBadge === index;
        const isCurrentlyScanning = isScanning && isActive;

        return (
          <motion.div
            key={index}
            className="relative group"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="active"
            onHoverStart={() => setActiveBadge(index)}
            onHoverEnd={() => setActiveBadge(null)}
          >
            <motion.div
              className={`glass-card rounded-xl p-4 text-center relative overflow-hidden
                ${isActive ? 'border-neon-primary' : 'border-border-default'}
                transition-all duration-300`}
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: isActive 
                  ? '0 10px 30px rgba(0, 255, 136, 0.2)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.3)'
              }}
              animate={isActive ? "active" : "visible"}
            >
              {/* Holographic overlay */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={holographicStyle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* Scanning line effect */}
              <AnimatePresence>
                {isCurrentlyScanning && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-primary to-transparent"
                      style={{
                        left: `${scanPosition}%`,
                        transform: 'translateX(-50%)'
                      }}
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                className="text-3xl mb-2"
                variants={iconVariants}
                animate={isCurrentlyScanning ? "scanning" : isActive ? "active" : "idle"}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                className={`text-sm font-semibold mb-1 ${
                  isActive ? 'text-neon-primary' : 'text-text-primary'
                }`}
                animate={{
                  color: isActive ? '#00ff88' : '#ffffff'
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className={`text-xs ${
                  isActive ? 'text-neon-primary/80' : 'text-text-secondary'
                }`}
                animate={{
                  color: isActive ? 'rgba(0, 255, 136, 0.8)' : '#a1a1aa'
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.description}
              </motion.p>

              {/* Glow effect */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Security shield animation */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute top-2 right-2 w-4 h-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-full h-full border-2 border-neon-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Connection lines */}
            <AnimatePresence>
              {isActive && index < securityFeatures.length - 1 && (
                <motion.div
                  className="absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-neon-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SecurityBadges;