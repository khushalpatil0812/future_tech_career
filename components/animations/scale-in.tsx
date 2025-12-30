'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export function ScaleIn({ children, delay = 0, ...props }: ScaleInProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
