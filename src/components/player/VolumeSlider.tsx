import React, { useRef, useCallback } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeSlider({ volume, onVolumeChange }: VolumeSliderProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      onVolumeChange(Math.max(0, Math.min(1, percent)));
    },
    [onVolumeChange]
  );

  const toggleMute = () => {
    onVolumeChange(volume === 0 ? 0.7 : 0);
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleMute} className="btn-icon p-2">
        <VolumeIcon size={18} />
      </button>
      <div
        ref={barRef}
        className="w-20 h-1 bg-muted rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div
          className="h-full bg-foreground rounded-full relative transition-all"
          style={{ width: `${volume * 100}%` }}
        >
          <div className="slider-thumb absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
