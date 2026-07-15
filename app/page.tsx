"use client";

import { useState } from "react";
import KeyboardScene from "./components/KeyboardScene";
import LandingOverlay from "./components/LandingOverlay";
import BackButton from "./components/BackButton";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <KeyboardScene entered={entered} />
      <LandingOverlay entered={entered} onEnter={() => setEntered(true)} />
      {entered && <BackButton onClick={() => setEntered(false)} />}
    </div>
  );
}
