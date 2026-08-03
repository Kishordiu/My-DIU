"use client";

import { SeaScene } from "@/components/SeaScene";
import { useDIUState } from "@/hooks/useDIUState";

export default function Home() {
  const { state, setState } = useDIUState({ mockCycle: true });

  const handleMicClick = () => {
    if (state === "listening") {
      setState("idle");
    } else {
      setState("listening");
    }
  };

  return (
    <main className="h-dvh w-full overflow-hidden">
      <SeaScene state={state} onMicClick={handleMicClick} />
    </main>
  );
}
