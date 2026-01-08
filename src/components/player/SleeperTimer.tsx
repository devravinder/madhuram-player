import { usePlayer } from "@/context/PlayerContext";
import { Timer, X } from "lucide-react";
import { useMemo, useState } from "react";
import TimeInput from "./TimeInput";
import StopWatch from "./StopWatch";

export default function SleeperTimer({ onClose }: { onClose?: VoidFunction }) {
  const { sleepTimer, setSleepTimer, cancelSleepTimer } = usePlayer();
  const [time, setTime] = useState(0);

  const setTimer = () => {
    console.log({time})
    setSleepTimer(time);
    onClose?.();
  };

  // BUG HERE
  const remainingTime = useMemo(() => {
    if (!sleepTimer.isActive || !sleepTimer.endTime) return null;

    console.log({e: new Date(sleepTimer.endTime)})
    const remaining = Math.max(0, sleepTimer.endTime - new Date().getTime());

    const seconds = Math.floor(remaining / 1000)

    console.log({seconds})

    return seconds;
  }, [sleepTimer.isActive, sleepTimer.endTime]);

  return (
    <div className="glass rounded-lg p-4 w-xs flex flex-col gap-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-primary">
          <Timer size={24} />
          <h2 className="text-xl font-bold">Sleep Timer</h2>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="p-2 rounded-lg hover:bg-accent cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      {sleepTimer.isActive && (
        <div className="mb-4 p-4 bg-primary/10 rounded-xl">
          <p className="text-sm text-muted-foreground">Timer active</p>
          <p className="text-2xl font-bold text-primary">
            {!remainingTime ? undefined : (
              <StopWatch key={sleepTimer.endTime} seconds={remainingTime} />
            )}
          </p>
          <button
            onClick={() => {
              cancelSleepTimer();
              onClose?.();
            }}
            className="mt-2 text-sm text-destructive hover:underline"
          >
            Cancel Timer
          </button>
        </div>
      )}

      <div className="space-y-4">
        <TimeInput value={time} onChange={setTime} />
        <button
          onClick={setTimer}
          disabled={time == 0}
          className={`disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center p-3 rounded-xl transition-colors bg-primary/10 text-primary`}
        >
          Set Timer
        </button>
      </div>
    </div>
  );
}
