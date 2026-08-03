"use client";

import { motion, AnimatePresence } from "framer-motion";
import { STATE_STATUS } from "@/lib/constants";
import type { DIUState } from "@/lib/types";

interface FloatingStatusTextProps {
  state: DIUState;
}

export function FloatingStatusText({ state }: FloatingStatusTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={state}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xs px-4 text-center text-sm font-light tracking-wide text-[#7affd4]/70 sm:max-w-md sm:text-base"
      >
        {STATE_STATUS[state]}
      </motion.p>
    </AnimatePresence>
  );
}
