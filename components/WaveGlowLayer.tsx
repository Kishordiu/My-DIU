"use client";

import { motion } from "framer-motion";
import { SEA_STATE_CONFIG } from "@/lib/constants";
import type { DIUState } from "@/lib/types";

interface WaveGlowLayerProps {
  state: DIUState;
}

export function WaveGlowLayer({ state }: WaveGlowLayerProps) {
  const config = SEA_STATE_CONFIG[state];

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "120vmax",
          height: "120vmax",
          background: `radial-gradient(circle, rgba(61,255,184,${config.glowIntensity * 0.08}) 0%, transparent 60%)`,
        }}
        animate={{
          scale: state === "speaking"
            ? [1, 1.15, 1.05, 1.2, 1]
            : [1, 1.04, 1],
          opacity: state === "speaking"
            ? [0.5, 1, 0.7, 1, 0.5]
            : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: state === "speaking" ? 1.2 / config.pulseSpeed : 3 / config.breathSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {state === "speaking" &&
        Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-[#3dffb8]/20"
            style={{
              width: "40vmin",
              height: "40vmin",
              marginLeft: "-20vmin",
              marginTop: "-20vmin",
            }}
            animate={{
              scale: [0.5, 2.5],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}

      {state === "thinking" &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from ${i * 120}deg, transparent 0%, rgba(46,230,160,0.03) 10%, transparent 20%)`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {state === "listening" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "50vmin",
            height: "50vmin",
            boxShadow: "0 0 80px 30px rgba(61,255,184,0.15), inset 0 0 60px 20px rgba(61,255,184,0.08)",
          }}
          animate={{
            boxShadow: [
              "0 0 60px 20px rgba(61,255,184,0.1), inset 0 0 40px 15px rgba(61,255,184,0.05)",
              "0 0 100px 40px rgba(61,255,184,0.2), inset 0 0 80px 30px rgba(61,255,184,0.12)",
              "0 0 60px 20px rgba(61,255,184,0.1), inset 0 0 40px 15px rgba(61,255,184,0.05)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
