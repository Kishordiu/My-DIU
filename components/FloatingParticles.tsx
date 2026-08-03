"use client";

import { useEffect, useRef } from "react";
import { SEA_STATE_CONFIG } from "@/lib/constants";
import type { DIUState, Particle } from "@/lib/types";

interface FloatingParticlesProps {
  state: DIUState;
}

function createParticle(width: number, height: number, speed: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speed * 0.3,
    vy: -Math.random() * speed * 0.5 - 0.1,
    size: 1 + Math.random() * 2.5,
    opacity: 0.1 + Math.random() * 0.4,
    life: Math.random(),
    maxLife: 1,
    hue: 150 + Math.random() * 30,
  };
}

export function FloatingParticles({ state }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const count = Math.floor(
      (window.innerWidth * window.innerHeight) / 12000
    );
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.clientWidth, canvas.clientHeight, 1)
    );

    const animate = () => {
      const config = SEA_STATE_CONFIG[stateRef.current];
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx * config.particleSpeed;
        p.y += p.vy * config.particleSpeed;
        p.life += 0.002;

        if (p.y < -10 || p.x < -10 || p.x > w + 10 || p.life > p.maxLife) {
          Object.assign(p, createParticle(w, h, config.particleSpeed));
          p.y = h + 10;
        }

        const flicker = 0.5 + Math.sin(p.life * 10 + p.x) * 0.5;
        const alpha = p.opacity * flicker * (0.5 + config.glowIntensity * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`;
        ctx.fill();

        if (p.size > 2) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          glow.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${alpha * 0.3})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      aria-hidden="true"
    />
  );
}
