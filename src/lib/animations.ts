import type { Easing, Variants, Transition } from "framer-motion";

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  },
};

// Fade up animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  },
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as Easing,
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  },
};

// Slide from left
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  },
};

// Slide from right
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  },
};

// Float animation (for decorative elements)
export const floatTransition: Transition = {
  duration: 6,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
};

// Pulse glow animation
export const pulseTransition: Transition = {
  duration: 3,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
};

// Rotate animation
export const rotateTransition: Transition = {
  duration: 20,
  ease: "linear",
  repeat: Infinity,
};

// Card hover animation - inline styles for whileHover
export const cardHoverStyle = {
  scale: 1.02,
  y: -8,
};

// Text reveal animation (for headings)
export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as Easing,
    },
  }),
};

// Viewport animation settings
export const viewportSettings = {
  once: true,
  margin: "-100px" as const,
};
