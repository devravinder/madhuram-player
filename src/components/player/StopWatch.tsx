import { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function toString(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));

  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
}

export default function StopWatch({ seconds }: { seconds: number }) {
  const [remainingTime, setRemainingTime] = useState(()=>{
    console.log({seconds})
    return seconds
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime((remainingTime) => remainingTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <>{toString(remainingTime)}</>;
}
