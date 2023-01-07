import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

export function ProgressBar({ audioRef }) {
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth(((audioRef.current.currentTime)));
    }, 1000);
    return () => clearInterval(interval);
  },);

  const onSeek = (value) => {
    audioRef.current.currentTime = Math.floor(value);
    setProgressWidth(value);
  }
  if(audioRef.current === undefined){
    return (
      <Form.Range
    step={1}
    min={0}
    disabled
    />
    )
  }
  return (
    
    <Form.Range
    value={progressWidth}
    step={1}
    max={audioRef.current.duration}
    min={0}
    onChange={(e) => {onSeek(e.target.value)}} 
    />
  );
}
