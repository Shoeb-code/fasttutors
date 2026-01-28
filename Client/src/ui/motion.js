export const pageMotion = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6, ease: "easeOut" },
  };
  
  export const cardMotion = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
  };
  
  export const hoverScale = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };
  