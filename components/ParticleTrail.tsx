"use client";

import { useParticleTrail } from "@/hooks/useParticleTrail";

export function ParticleTrail() {
  const { canvasRef } = useParticleTrail();

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
      aria-hidden="true"
    />
  );
}
