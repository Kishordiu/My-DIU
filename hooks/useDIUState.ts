"use client";

import { useCallback, useEffect, useState } from "react";
import { DIU_STATES, MOCK_CYCLE_MS } from "@/lib/constants";
import type { DIUState } from "@/lib/types";

interface UseDIUStateOptions {
  /** Enable automatic mock cycling for visual testing */
  mockCycle?: boolean;
  cycleIntervalMs?: number;
  initialState?: DIUState;
}

/**
 * DIU state management.
 *
 * Currently uses mock state cycling for visual prototyping.
 * Replace mock cycle with real orchestrator when connecting:
 * - Ollama → thinking / speaking
 * - Mic → listening
 * - Wake word → idle → listening
 * - TTS → speaking
 *
 * @see lib/integration.ts
 */
export function useDIUState(options: UseDIUStateOptions = {}) {
  const {
    mockCycle = true,
    cycleIntervalMs = MOCK_CYCLE_MS,
    initialState = "idle",
  } = options;

  const [state, setState] = useState<DIUState>(initialState);
  const [isMockMode] = useState(mockCycle);

  const cycleNext = useCallback(() => {
    setState((current) => {
      const index = DIU_STATES.indexOf(current);
      return DIU_STATES[(index + 1) % DIU_STATES.length];
    });
  }, []);

  useEffect(() => {
    if (!mockCycle) return;

    const interval = setInterval(cycleNext, cycleIntervalMs);
    return () => clearInterval(interval);
  }, [mockCycle, cycleIntervalMs, cycleNext]);

  const setDIUState = useCallback((next: DIUState) => {
    setState(next);
  }, []);

  return {
    state,
    setState: setDIUState,
    cycleNext,
    isMockMode,
  };
}
