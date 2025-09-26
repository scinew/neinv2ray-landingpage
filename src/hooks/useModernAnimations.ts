import { useState, useEffect, useCallback } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';

export interface MagneticState {
  x: number;
  y: number;
  scale: number;
}

export interface AnimationConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export const useMagneticEffect = (strength: number = 0.3) => {
  const [magneticState, setMagneticState] = useState<MagneticState>({
    x: 0,
    y: 0,
    scale: 1
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
    scale.set(1.05);
  }, [x, y, scale, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  return {
    magneticState,
    springX,
    springY,
    springScale,
    handleMouseMove,
    handleMouseLeave
  };
};

export const useRippleEffect = () => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, createRipple };
};

export const useGlowEffect = (intensity: number = 1) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const glowSpring = useSpring(glowIntensity, {
    stiffness: 200,
    damping: 20
  });

  const glowTransform = useTransform(glowSpring, [0, 1], [
    '0 0 5px rgba(0, 255, 136, 0.2)',
    '0 0 20px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)'
  ]);

  const activateGlow = useCallback(() => {
    setGlowIntensity(1);
  }, []);

  const deactivateGlow = useCallback(() => {
    setGlowIntensity(0);
  }, []);

  return {
    glowTransform,
    activateGlow,
    deactivateGlow
  };
};

export const useParticleSystem = (particleCount: number = 20) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>>([]);

  const createParticle = useCallback((x: number, y: number) => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      maxLife: 1
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
  }, [particleCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return { particles, createParticle };
};

export const useBreathingAnimation = (duration: number = 4) => {
  const [isBreathing, setIsBreathing] = useState(true);
  
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0.7);
  
  const breathingScale = useSpring(scale, {
    stiffness: 100,
    damping: 20
  });
  
  const breathingOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 20
  });

  useEffect(() => {
    if (!isBreathing) return;

    const animate = () => {
      scale.set(1.1);
      opacity.set(1);
      
      setTimeout(() => {
        scale.set(1);
        opacity.set(0.7);
      }, duration * 500);
    };

    const interval = setInterval(animate, duration * 1000);
    animate();

    return () => clearInterval(interval);
  }, [isBreathing, scale, opacity, duration]);

  return {
    breathingScale,
    breathingOpacity,
    setIsBreathing
  };
};

export const useMatrixEffect = () => {
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = Array.from({ length: 20 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        );
        return [...prev.slice(-10), ...newChars];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [chars]);

  return matrixChars;
};

export const useCyberScan = () => {
  const [scanPosition, setScanPosition] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = useCallback(() => {
    setIsScanning(true);
    setScanPosition(0);
  }, []);

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanPosition(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isScanning]);

  return { scanPosition, isScanning, startScan };
};

export const useHolographicEffect = () => {
  const [holographicPhase, setHolographicPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHolographicPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const holographicStyle = {
    background: `linear-gradient(${holographicPhase}deg, 
      rgba(0, 255, 136, 0.1) 0%, 
      rgba(139, 92, 246, 0.1) 50%, 
      rgba(0, 255, 136, 0.1) 100%)`,
    backgroundSize: '200% 200%',
    animation: 'holographic 3s ease-in-out infinite'
  };

  return { holographicStyle, holographicPhase };
};