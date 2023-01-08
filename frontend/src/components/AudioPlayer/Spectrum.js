import AudioSpectrum from "react-audio-spectrum";
import { useState, useEffect } from "react";
import "./Spectrum.css";

export function Spectrum({ audioUrl, theme }) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId(audioUrl + "_Spectrum");
  }, [audioUrl]);
  const [mytheme, setMytheme] = useState(theme);
  useEffect(() => {
    setMytheme(theme);
    console.log("theme changed");
  }, [theme]);
  console.log(mytheme)
  return (
    <div style={{borderBottom:"1px solid", borderColor:(theme==="light" ? "#BCD5EB" : "#AC6086" )}} className="AudioSpectrum1">
      {mytheme==="light" ? 
      <AudioSpectrum
        id="audio-canvas1"
        key={id}
        height={200}
        width={520}
        audioId={audioUrl}
        capColor="#BCD5EB"
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor="#BCD5EB"
        gap={4}
      /> :
      <AudioSpectrum
        id="audio-canvas2"
        key={id}
        height={200}
        width={520}
        audioId={audioUrl}
        capColor="#AC6086"
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor="#AC6086"
        gap={4}
      />}
    </div>
  );
}
