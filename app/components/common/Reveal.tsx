"use client";
import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  delay?: number;
  className?: string;
  y?: number;
}>;

export const Reveal = ({ children, delay = 0, className, y = 28 }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
