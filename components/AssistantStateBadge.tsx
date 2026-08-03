"use client";

import { motion, AnimatePresence } from "framer-motion";
import { STATE_LABELS } from "@/lib/constants";
import type { DIUState } from "@/lib/types";

interface AssistantStateBadgeProps {
  state: DIUState;
}

const STATE_COLORS: Record<DIUState, string> = {
  idle: "#3dffb8",
  listening: "#7affd4",
  thinking: "#2ee6a0",
  speaking: "#b8ffe8",
};

export function AssistantStateBadge({ state }: AssistantStateBadgeProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4 }}
        className="mt-3 flex items-center gap-2"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: STATE_COLORS[state] }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span
          className="text-[10px] uppercase tracking-[0.25em] sm:text-xs"
          style={{ color: STATE_COLORS[state] }}
        >
          {STATE_LABELS[state]}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
