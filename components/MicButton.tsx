"use client";

import { motion } from "framer-motion";
import type { DIUState } from "@/lib/types";

interface MicButtonProps {
  state: DIUState;
  onClick?: () => void;
}

export function MicButton({ state, onClick }: MicButtonProps) {
  const isActive = state === "listening";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
      aria-label={isActive ? "Stop listening" : "Start listening"}
      whileTap={{ scale: 0.92 }}
      animate={{
        boxShadow: isActive
          ? [
              "0 0 20px 4px rgba(61,255,184,0.3)",
              "0 0 40px 8px rgba(61,255,184,0.5)",
              "0 0 20px 4px rgba(61,255,184,0.3)",
            ]
          : "0 0 12px 2px rgba(61,255,184,0.15)",
      }}
      transition={{
        boxShadow: { duration: 1.5, repeat: isActive ? Infinity : 0 },
      }}
    >
      <span className="absolute inset-0 rounded-full border border-[#3dffb8]/20 bg-[#042820]/60 backdrop-blur-sm transition-colors group-hover:border-[#3dffb8]/40" />

      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-full border border-[#3dffb8]/30"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5 text-[#7affd4] sm:h-6 sm:w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"
          strokeLinecap="round"
        />
        <path d="M6 10v1a6 6 0 0 0 12 0v-1" strokeLinecap="round" />
        <path d="M12 17v3" strokeLinecap="round" />
      </svg>
    </motion.button>
  );
}
