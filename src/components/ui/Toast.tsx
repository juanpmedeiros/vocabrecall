/**
 * Toast notification item (PROMPT 4 + PROMPT 7).
 * Enter: translateX(100%)→0 + opacity 0→1 (300ms ease-out).
 * Exit: translateX(0)→100% + opacity 1→0 (250ms ease-in); removed from DOM after exit.
 */

import { motion } from 'motion/react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

export function Toast({ message, type }: ToastProps) {
  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{
        enter: { duration: 0.3, ease: [0, 0, 0.2, 1] },
        exit: { duration: 0.25, ease: [0.4, 0, 1, 1] },
      }}
      className={`
        pointer-events-auto min-w-[280px] max-w-sm rounded-xl border px-4 py-3 shadow-lg
        ${isSuccess ? 'border-success/30 bg-success/10 text-success' : 'border-destructive/30 bg-destructive/10 text-destructive'}
      `}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  );
}
