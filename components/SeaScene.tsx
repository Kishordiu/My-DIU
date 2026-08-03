"use client";

import { useSeaAnimation } from "@/hooks/useSeaAnimation";
import type { DIUState } from "@/lib/types";
import { DIUPresence } from "./DIUPresence";
import { FloatingParticles } from "./FloatingParticles";
import { ParticleTrail } from "./ParticleTrail";
import { WaveGlowLayer } from "./WaveGlowLayer";
import { MicButton } from "./MicButton";
import { AssistantStateBadge } from "./AssistantStateBadge";
import { FloatingStatusText } from "./FloatingStatusText";

interface SeaSceneProps {
  state: DIUState;
  onMicClick?: () => void;
}

export function SeaScene({ state, onMicClick }: SeaSceneProps) {
  const { canvasRef } = useSeaAnimation({ state });

  return (
    <div className="sea-scene relative h-dvh w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <WaveGlowLayer state={state} />
      <FloatingParticles state={state} />
      <DIUPresence state={state} />

      <ParticleTrail />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 sm:pb-12">
        <FloatingStatusText state={state} />
        <AssistantStateBadge state={state} />
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 sm:bottom-12">
        <MicButton state={state} onClick={onMicClick} />
      </div>

      <div className="sea-vignette pointer-events-none absolute inset-0 z-10" />
    </div>
  );
}
