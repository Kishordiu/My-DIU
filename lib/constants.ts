import type { DIUState, SeaStateConfig } from "./types";

export const DIU_STATES: DIUState[] = [
  "idle",
  "listening",
  "thinking",
  "speaking",
];

export const STATE_LABELS: Record<DIUState, string> = {
  idle: "At rest",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
};

export const STATE_STATUS: Record<DIUState, string> = {
  idle: "The sea breathes quietly",
  listening: "DIU hears you",
  thinking: "Ripples deepen in thought",
  speaking: "Luminous waves carry DIU's voice",
};

export const MOCK_CYCLE_MS = 6000;

export const SEA_COLORS = {
  abyss: "#021812",
  deep: "#042820",
  emerald: "#0a3d2e",
  seaGreen: "#0f5240",
  neonMint: "#3dffb8",
  glowMint: "#7affd4",
  softGlow: "#b8ffe8",
  filament: "#5cffc4",
  ripple: "#2ee6a0",
} as const;

export const SEA_STATE_CONFIG: Record<DIUState, SeaStateConfig> = {
  idle: {
    breathSpeed: 0.35,
    breathAmplitude: 0.12,
    waveSpeed: 0.4,
    waveAmplitude: 0.08,
    rippleDepth: 0.15,
    glowIntensity: 0.35,
    glowRadius: 0.45,
    pulseSpeed: 0.5,
    particleSpeed: 0.3,
    causticOpacity: 0.08,
    filamentActivity: 0.25,
  },
  listening: {
    breathSpeed: 0.55,
    breathAmplitude: 0.18,
    waveSpeed: 0.65,
    waveAmplitude: 0.12,
    rippleDepth: 0.25,
    glowIntensity: 0.65,
    glowRadius: 0.55,
    pulseSpeed: 1.2,
    particleSpeed: 0.55,
    causticOpacity: 0.14,
    filamentActivity: 0.55,
  },
  thinking: {
    breathSpeed: 0.75,
    breathAmplitude: 0.22,
    waveSpeed: 0.9,
    waveAmplitude: 0.28,
    rippleDepth: 0.55,
    glowIntensity: 0.5,
    glowRadius: 0.5,
    pulseSpeed: 1.8,
    particleSpeed: 0.75,
    causticOpacity: 0.18,
    filamentActivity: 0.75,
  },
  speaking: {
    breathSpeed: 1.1,
    breathAmplitude: 0.35,
    waveSpeed: 1.4,
    waveAmplitude: 0.42,
    rippleDepth: 0.35,
    glowIntensity: 0.95,
    glowRadius: 0.75,
    pulseSpeed: 2.8,
    particleSpeed: 1.1,
    causticOpacity: 0.22,
    filamentActivity: 1,
  },
};
