import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return <motion.div
    className={className}
    initial={reduced ? false : { opacity: 1, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: reduced ? 0 : 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    {...props}
  >{children}</motion.div>;
}
