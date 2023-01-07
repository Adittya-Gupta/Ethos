import { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

export function PlayerButtons({ audioUrl, audioRef }) {
  // const [isPaused, setIsPaused] = useState(false);
  // const [isStopped, setIsStopped] = useState(true);

  // Let's reset the play button look after a file
  // has been dropped while another being played
  // useEffect(() => {
  //   setIsStopped(true);
  // }, [audioUrl]);
  if(audioRef.current){
  return (
    <div>
      <button
        onClick={() => {
          audioRef.current.load();
          // setIsPaused(false);
          // setIsStopped(true);
        }}
      >
        <StopIcon />
      </button>
      {/* {isPaused || isStopped ? ( */}
      {audioRef.current.isStopped ? (
        <button
          onClick={() => {
            audioRef.current.play();
            // setIsPaused(false);
            // setIsStopped(false);
          }}
          style={{ backgroundColor: audioRef.current.isStopped ? "lightblue" : "goldenrod" }}
        >
          <PlayArrowIcon />
        </button>
      ) : (
        <button
          onClick={() => {
            audioRef.current.pause();
            // setIsPaused(true);
            // setIsStopped(false);
            console.log(audioRef.current.currentTime);
          }}
          style={{ backgroundColor: "goldenrod" }}
        >
          <PauseIcon />
        </button>
      )}
    </div>
  );}
}

