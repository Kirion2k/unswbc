import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function LetterAnimation({
  text,
  as: Tag = 'span',
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  type = 'fade-up',
  inView = false,
  style = {},
  letterStyle = {},
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag style={style} {...props}>{text}</Tag>;
  }

  const getVariants = () => {
    switch (type) {
      case 'slide-in':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const letterVariants = getVariants();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const viewProps = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }
    : { initial: 'hidden', animate: 'visible' };

  return (
    <motion.span
      variants={containerVariants}
      style={{ display: 'inline-block', ...style }}
      {...viewProps}
      {...props}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', ...letterStyle }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
