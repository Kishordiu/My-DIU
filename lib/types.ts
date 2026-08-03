export type DIUState = "idle" | "listening" | "thinking" | "speaking";

export interface SeaStateConfig {
  breathSpeed: number;
  breathAmplitude: number;
  waveSpeed: number;
  waveAmplitude: number;
  rippleDepth: number;
  glowIntensity: number;
  glowRadius: number;
  pulseSpeed: number;
  particleSpeed: number;
  causticOpacity: number;
  filamentActivity: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
}

export interface TrailPoint {
  x: number;
  y: number;
  life: number;
  size: number;
}
