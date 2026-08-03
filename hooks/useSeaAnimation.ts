"use client";

import { useCallback, useEffect, useRef } from "react";
import { SEA_COLORS, SEA_STATE_CONFIG } from "@/lib/constants";
import { lerpSeaConfig } from "@/lib/lerp";
import type { DIUState, SeaStateConfig } from "@/lib/types";

interface UseSeaAnimationOptions {
  state: DIUState;
}

function drawSea(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  config: SeaStateConfig
) {
  const cx = width / 2;
  const cy = height / 2;
  const breath = Math.sin(time * config.breathSpeed) * config.breathAmplitude;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.75);
  gradient.addColorStop(0, `rgba(61, 255, 184, ${0.06 + config.glowIntensity * 0.08})`);
  gradient.addColorStop(0.35, `rgba(15, 82, 64, ${0.25 + breath * 0.1})`);
  gradient.addColorStop(0.7, SEA_COLORS.emerald);
  gradient.addColorStop(1, SEA_COLORS.abyss);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const waveLayers = [
    { yOffset: 0.15, freq: 0.003, amp: 40, speed: 0.8, alpha: 0.04 },
    { yOffset: 0.35, freq: 0.005, amp: 55, speed: 1.1, alpha: 0.06 },
    { yOffset: 0.55, freq: 0.004, amp: 70, speed: 0.6, alpha: 0.05 },
    { yOffset: 0.75, freq: 0.006, amp: 45, speed: 1.4, alpha: 0.07 },
  ];

  for (const layer of waveLayers) {
    ctx.beginPath();
    const baseY = height * layer.yOffset;
    const amp =
      layer.amp *
      config.waveAmplitude *
      (1 + config.rippleDepth * 0.5);

    for (let x = 0; x <= width; x += 3) {
      const wave1 =
        Math.sin(x * layer.freq + time * layer.speed * config.waveSpeed) * amp;
      const wave2 =
        Math.sin(x * layer.freq * 2.3 + time * layer.speed * 0.7) * amp * 0.3;
      const ripple =
        Math.sin(
          Math.sqrt((x - cx) ** 2 + (baseY - cy) ** 2) * 0.015 -
            time * config.pulseSpeed * 2
        ) *
        amp *
        config.rippleDepth *
        0.4;

      const y = baseY + wave1 + wave2 + ripple + breath * 20;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = `rgba(46, 230, 160, ${layer.alpha * (0.5 + config.glowIntensity * 0.5)})`;
    ctx.fill();
  }

  const causticCount = 12;
  for (let i = 0; i < causticCount; i++) {
    const angle = (i / causticCount) * Math.PI * 2 + time * 0.15;
    const radius = width * (0.15 + (i % 3) * 0.08);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * 0.6;
    const size = 80 + Math.sin(time * 0.8 + i) * 30;

    const caustic = ctx.createRadialGradient(x, y, 0, x, y, size);
    caustic.addColorStop(0, `rgba(122, 255, 212, ${config.causticOpacity})`);
    caustic.addColorStop(1, "rgba(122, 255, 212, 0)");
    ctx.fillStyle = caustic;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
  }

  const glowSize = width * config.glowRadius * 0.35;
  const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
  centerGlow.addColorStop(
    0,
    `rgba(61, 255, 184, ${0.12 + config.glowIntensity * 0.25})`
  );
  centerGlow.addColorStop(
    0.4,
    `rgba(46, 230, 160, ${0.04 + config.glowIntensity * 0.1})`
  );
  centerGlow.addColorStop(1, "rgba(4, 40, 32, 0)");
  ctx.fillStyle = centerGlow;
  ctx.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2);

  if (config.rippleDepth > 0.3) {
    const ringCount = 3;
    for (let r = 0; r < ringCount; r++) {
      const ringPhase = (time * config.pulseSpeed + r * 1.2) % 3;
      const ringRadius = ringPhase * width * 0.25;
      const ringAlpha =
        (1 - ringPhase / 3) * config.rippleDepth * 0.15;

      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(92, 255, 196, ${ringAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
}

export function useSeaAnimation({ state }: UseSeaAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef<SeaStateConfig>(SEA_STATE_CONFIG.idle);
  const targetConfigRef = useRef<SeaStateConfig>(SEA_STATE_CONFIG[state]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    targetConfigRef.current = SEA_STATE_CONFIG[state];
  }, [state]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    configRef.current = lerpSeaConfig(
      configRef.current,
      targetConfigRef.current,
      0.04
    );

    timeRef.current += 0.016;
    drawSea(ctx, canvas.width, canvas.height, timeRef.current, configRef.current);

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, resize]);

  return { canvasRef };
}
