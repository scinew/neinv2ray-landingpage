import { Variants } from 'framer-motion';

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    scale: 1.05,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

// Card animation variants
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -15,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  hover: {
    y: -8,
    rotateX: 5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Button animation variants
export const buttonVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 15px 40px rgba(0, 255, 136, 0.4)',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  pressed: {
    scale: 0.95,
    boxShadow: '0 5px 20px rgba(0, 255, 136, 0.3)',
    background: 'linear-gradient(135deg, #00cc6a 0%, #00aa55 100%)',
    transition: {
      duration: 0.1
    }
  },
  disabled: {
    scale: 1,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
    transition: {
      duration: 0.3
    }
  }
};

// Input field variants
export const inputVariants: Variants = {
  idle: {
    scale: 1,
    borderColor: '#2a2a2a',
    boxShadow: 'none'
  },
  focused: {
    scale: 1.02,
    borderColor: '#00ff88',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  error: {
    borderColor: '#ff2d55',
    boxShadow: '0 0 20px rgba(255, 45, 85, 0.3)',
    transition: {
      duration: 0.3
    }
  }
};

// Modal variants
export const modalVariants: Variants = {
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
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Success animation variants
export const successVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180
  },
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

// Particle animation variants
export const particleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      duration: 0.5
    }
  }
};

// Text reveal variants
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Icon animation variants
export const iconVariants: Variants = {
  idle: {
    rotate: 0,
    scale: 1
  },
  active: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  },
  scanning: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "linear"
    }
  }
};

// Badge animation variants
export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8
  },
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
    transition: {
      duration: 0.3
    }
  },
  active: {
    scale: 1.1,
    y: -8,
    boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
    transition: {
      duration: 0.3
    }
  }
};

// Loading animation variants
export const loadingVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  spinning: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Ripple animation variants
export const rippleVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 1
  },
  visible: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Glow animation variants
export const glowVariants: Variants = {
  idle: {
    boxShadow: '0 0 5px rgba(0, 255, 136, 0.2)'
  },
  active: {
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)',
    transition: {
      duration: 0.3
    }
  }
};

// Holographic animation variants
export const holographicVariants: Variants = {
  idle: {
    backgroundPosition: '0% 50%'
  },
  active: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Matrix animation variants
export const matrixVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Magnetic animation variants
export const magneticVariants: Variants = {
  idle: {
    x: 0,
    y: 0,
    scale: 1
  },
  hover: {
    x: 0,
    y: 0,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Breathing animation variants
export const breathingVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 0.7
  },
  breathing: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scan line animation variants
export const scanLineVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0
  },
  visible: {
    x: '100%',
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Success checkmark animation variants
export const checkmarkVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

// Utility function to create staggered animations
export const createStaggeredVariants = (delay: number = 0.1): Variants => ({
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay
    }
  }
});

// Utility function to create spring animations
export const createSpringVariants = (stiffness: number = 200, damping: number = 15): Variants => ({
  hidden: {
    scale: 0,
    rotate: -180
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness,
      damping
    }
  }
});

// Utility function to create fade animations
export const createFadeVariants = (direction: 'up' | 'down' | 'left' | 'right' = 'up'): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 20 };
      case 'down': return { y: -20 };
      case 'left': return { x: 20 };
      case 'right': return { x: -20 };
      default: return { y: 20 };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
};