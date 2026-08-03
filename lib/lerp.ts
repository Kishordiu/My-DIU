import type { SeaStateConfig } from "./types";

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpSeaConfig(
  from: SeaStateConfig,
  to: SeaStateConfig,
  t: number
): SeaStateConfig {
  return {
    breathSpeed: lerp(from.breathSpeed, to.breathSpeed, t),
    breathAmplitude: lerp(from.breathAmplitude, to.breathAmplitude, t),
    waveSpeed: lerp(from.waveSpeed, to.waveSpeed, t),
    waveAmplitude: lerp(from.waveAmplitude, to.waveAmplitude, t),
    rippleDepth: lerp(from.rippleDepth, to.rippleDepth, t),
    glowIntensity: lerp(from.glowIntensity, to.glowIntensity, t),
    glowRadius: lerp(from.glowRadius, to.glowRadius, t),
    pulseSpeed: lerp(from.pulseSpeed, to.pulseSpeed, t),
    particleSpeed: lerp(from.particleSpeed, to.particleSpeed, t),
    causticOpacity: lerp(from.causticOpacity, to.causticOpacity, t),
    filamentActivity: lerp(from.filamentActivity, to.filamentActivity, t),
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
