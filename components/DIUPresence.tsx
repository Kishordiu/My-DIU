"use client";

import { motion } from "framer-motion";
import { SEA_STATE_CONFIG } from "@/lib/constants";
import type { DIUState } from "@/lib/types";

interface DIUPresenceProps {
  state: DIUState;
}

const FILAMENT_COUNT = 8;

export function DIUPresence({ state }: DIUPresenceProps) {
  const config = SEA_STATE_CONFIG[state];

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
      <svg
        className="h-[min(70vw,420px)] w-[min(70vw,420px)]"
        viewBox="-200 -200 400 400"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="diuCoreGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="#3dffb8"
              stopOpacity={0.15 + config.glowIntensity * 0.35}
            />
            <stop
              offset="50%"
              stopColor="#2ee6a0"
              stopOpacity={0.05 + config.glowIntensity * 0.15}
            />
            <stop offset="100%" stopColor="#042820" stopOpacity="0" />
          </radialGradient>
          <filter id="diuBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <motion.circle
          cx="0"
          cy="0"
          r={60 + config.glowRadius * 40}
          fill="url(#diuCoreGlow)"
          animate={{
            r: [
              60 + config.glowRadius * 40,
              70 + config.glowRadius * 50,
              60 + config.glowRadius * 40,
            ],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 / config.breathSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {Array.from({ length: FILAMENT_COUNT }).map((_, i) => {
          const angle = (i / FILAMENT_COUNT) * Math.PI * 2;
          const length = 80 + config.filamentActivity * 60;

          return (
            <motion.g key={i}>
              <motion.path
                d={`M 0 0 Q ${Math.cos(angle) * length * 0.5} ${Math.sin(angle) * length * 0.5} ${Math.cos(angle) * length} ${Math.sin(angle) * length}`}
                fill="none"
                stroke="#5cffc4"
                strokeWidth={0.8 + config.filamentActivity * 0.6}
                strokeOpacity={0.2 + config.filamentActivity * 0.5}
                filter="url(#diuBlur)"
                animate={{
                  d: [
                    `M 0 0 Q ${Math.cos(angle) * length * 0.5} ${Math.sin(angle) * length * 0.5} ${Math.cos(angle) * length} ${Math.sin(angle) * length}`,
                    `M 0 0 Q ${Math.cos(angle + 0.15) * length * 0.6} ${Math.sin(angle + 0.15) * length * 0.6} ${Math.cos(angle + 0.1) * length * 1.1} ${Math.sin(angle + 0.1) * length * 1.1}`,
                    `M 0 0 Q ${Math.cos(angle) * length * 0.5} ${Math.sin(angle) * length * 0.5} ${Math.cos(angle) * length} ${Math.sin(angle) * length}`,
                  ],
                  strokeOpacity: [
                    0.2 + config.filamentActivity * 0.3,
                    0.4 + config.filamentActivity * 0.5,
                    0.2 + config.filamentActivity * 0.3,
                  ],
                }}
                transition={{
                  duration: 1.5 / config.pulseSpeed + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          );
        })}

        <WaveformRing activity={config.filamentActivity} speed={config.pulseSpeed} />
        <WaveformRing
          activity={config.filamentActivity}
          speed={config.pulseSpeed}
          offset={Math.PI / 3}
          radius={35}
        />
      </svg>
    </div>
  );
}

function WaveformRing({
  activity,
  speed,
  offset = 0,
  radius = 25,
}: {
  activity: number;
  speed: number;
  offset?: number;
  radius?: number;
}) {
  const points = 32;
  const pathPoints = Array.from({ length: points + 1 }, (_, i) => {
    const angle = (i / points) * Math.PI * 2 + offset;
    const wave = Math.sin(angle * 4) * activity * 8;
    const r = radius + wave;
    return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
  });

  return (
    <motion.path
      d={`M ${pathPoints.join(" L ")} Z`}
      fill="none"
      stroke="#7affd4"
      strokeWidth={0.6 + activity * 0.4}
      strokeOpacity={0.15 + activity * 0.35}
      animate={{
        strokeOpacity: [
          0.15 + activity * 0.2,
          0.35 + activity * 0.4,
          0.15 + activity * 0.2,
        ],
      }}
      transition={{
        duration: 1.2 / speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
