'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  ...props
}: SlideInProps) {
  return (
    <motion.div
      initial={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
