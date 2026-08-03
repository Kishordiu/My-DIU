"use client";

import { useCallback, useEffect, useRef } from "react";
import type { TrailPoint } from "@/lib/types";

const MAX_TRAIL_POINTS = 60;
const TRAIL_DECAY = 0.92;

export function useParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  const addPoint = useCallback((x: number, y: number) => {
    pointsRef.current.push({
      x,
      y,
      life: 1,
      size: 2 + Math.random() * 4,
    });

    if (pointsRef.current.length > MAX_TRAIL_POINTS) {
      pointsRef.current.shift();
    }
  }, []);

  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = pointsRef.current.length - 1; i >= 0; i--) {
      const point = pointsRef.current[i];
      point.life *= TRAIL_DECAY;

      if (point.life < 0.02) {
        pointsRef.current.splice(i, 1);
        continue;
      }

      const sparkleCount = 3;
      for (let s = 0; s < sparkleCount; s++) {
        const offsetX = (Math.random() - 0.5) * point.size * 3;
        const offsetY = (Math.random() - 0.5) * point.size * 3;
        const sparkleSize = point.size * point.life * (0.5 + Math.random() * 0.5);

        const gradient = ctx.createRadialGradient(
          point.x + offsetX,
          point.y + offsetY,
          0,
          point.x + offsetX,
          point.y + offsetY,
          sparkleSize * 2
        );
        gradient.addColorStop(0, `rgba(184, 255, 232, ${point.life * 0.9})`);
        gradient.addColorStop(0.5, `rgba(61, 255, 184, ${point.life * 0.4})`);
        gradient.addColorStop(1, "rgba(61, 255, 184, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          point.x + offsetX,
          point.y + offsetY,
          sparkleSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    animationRef.current = requestAnimationFrame(drawTrail);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(drawTrail);

    const handleMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      addPoint(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      isTouchRef.current = true;
      for (const touch of Array.from(e.touches)) {
        addPoint(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      isTouchRef.current = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [addPoint, drawTrail, resize]);

  return { canvasRef };
}
