/**
 * Toast notification item (PROMPT 4).
 * Bottom-right, success (green) / error (red), fade in/out, design tokens.
 */

import { motion, AnimatePresence } from 'motion/react';

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
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
