import { useRef } from "react";
import { ProgressBar } from "./ProgressBar";
import { PlayerButtons } from "./PlayerButtons";
import "./Spectrum.css";
import "./Player.css";
import { Spectrum } from "./Spectrum";

export function Player({ showControls = false, audioUrl }) {
  const audioRef = useRef();
  return (
    <>
      <Spectrum audioUrl={audioUrl} />
      <ProgressBar audioRef={audioRef} />
      <section className="Player">
        <PlayerButtons audioUrl={audioUrl} audioRef={audioRef} />
        <audio
          crossOrigin="anonymous"
          key={audioUrl}
          id={audioUrl}
          ref={audioRef}
        >
          <source src={audioUrl} />
        </audio>
      </section>
    </>
  );
}
