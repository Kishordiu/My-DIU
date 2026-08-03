/**
 * Integration points for backend services.
 * Connect real implementations here when ready.
 */

import type { DIUState } from "./types";

/** Ollama LLM — wire streaming responses and drive `thinking` → `speaking` states */
export interface OllamaIntegration {
  /** POST to local Ollama API (default http://localhost:11434/api/generate) */
  generate: (prompt: string) => AsyncIterable<string>;
  /** Called when a full response stream completes */
  onComplete?: (response: string) => void;
}

/** Microphone capture — wire Web Audio / MediaRecorder for real listening */
export interface MicIntegration {
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  onAudioLevel?: (level: number) => void;
  onTranscript?: (text: string) => void;
}

/** Wake word detection — wire Porcupine, openWakeWord, or similar */
export interface WakeWordIntegration {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  onWake: () => void;
}

/** Text-to-speech — wire Web Speech API, ElevenLabs, or Piper */
export interface TTSIntegration {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

/** Central orchestrator — replace mock cycling in useDIUState with this */
export interface DIUOrchestrator {
  state: DIUState;
  setState: (state: DIUState) => void;
  ollama?: OllamaIntegration;
  mic?: MicIntegration;
  wakeWord?: WakeWordIntegration;
  tts?: TTSIntegration;
}

export const INTEGRATION_NOTES = {
  ollama: "lib/integration.ts → OllamaIntegration.generate()",
  mic: "lib/integration.ts → MicIntegration.startListening()",
  wakeWord: "lib/integration.ts → WakeWordIntegration.onWake",
  tts: "lib/integration.ts → TTSIntegration.speak()",
  orchestrator: "hooks/useDIUState.ts → replace mock cycle with DIUOrchestrator",
} as const;
