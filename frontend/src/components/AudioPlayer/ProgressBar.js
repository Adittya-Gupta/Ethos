import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

export function ProgressBar({ audioRef, playerBackgroundColor }) {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth((audioRef.current.currentTime)*100/audioRef.current.duration);
    }, 1000);
    return () => clearInterval(interval);
  },);

  const onSeek = (value) => {
    audioRef.current.currentTime = (value/100)*audioRef.current.duration;
    setProgressWidth(value);
  }
  return (
    <Form.Range
    value={progressWidth}
    step={1}
    max={100}
    min={0}
    onChange={(e) => {onSeek(e.target.value)}} 
    defaultValue={0}
    />
  );
}
