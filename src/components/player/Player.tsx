import { useState } from "react";
import MiniPlayer from "./MiniPlayer";
import {
  ChevronDown,
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  RotateCcw,
  RotateCw,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { ProgressBar } from "./ProgressBar";
import { formatTime } from "@/util/formatTime";
import { VolumeSlider } from "./VolumeSlider";

export default function Player() {
  const [isMini, setMini] = useState(true);

  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    shuffle,
    repeatMode,
    volume,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    togglePlay,
    next,
    previous,
    seek,
  } = usePlayer();

  if (!currentSong) {
    return undefined;
  }

  if (isMini) return <MiniPlayer onClick={() => setMini(false)} />;

  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat;

  return (
    <div className="shrink-0 glass absolute inset-0 z-50 overflow-hidden flex flex-col">
      <div className="w-full shrink-0 flex flex-row gap-2 px-4 py-4 bg-accent">
        <div className=" grow flex flex-row justify-center items-center">
          <span className="text-foreground">Now Playing</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            className="rounded-lg p-2 cursor-pointer"
            onClick={() => setMini(true)}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grow flex justify-center items-center">
        <div className="h-96 w-96 p-4">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center px-4 py-4">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row w-full gap-2 items-center justify-between">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <p className="font-medium text-sm line-clamp-1">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {currentSong.artist}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="cursor-pointer p-2 rounded-lg bg-accent">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <ProgressBar progress={progress} duration={duration} onSeek={seek} />
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(progress)}
            </span>
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-2 px-4">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <button
                  onClick={() => seek(progress - 15)}
                  className="cursor-pointer p-2 rounded-full hover:bg-accent relative flex items-center justify-center"
                >
                  <RotateCcw className="h-7 w-7 text-muted-foreground font-thin stroke-1" />
                  <span className="absolute leading-none text-muted-foreground text-xs top-1/2 -translate-y-1/2">
                    15
                  </span>
                </button>
              </div>
              <div className="col-span-2 flex flex-row items-center justify-between gap-1">
                <button
                  onClick={previous}
                  className="p-2 cursor-pointer rounded-full hover:bg-accent"
                >
                  <SkipBack className="h-6 w-6" />
                </button>
                <button
                  onClick={togglePlay}
                  className="rounded-full cursor-pointer bg-muted p-3"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={next}
                  className="p-2 cursor-pointer rounded-full hover:bg-accent"
                >
                  <SkipForward className="h-6 w-6" />
                </button>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => seek(progress + 15)}
                  className="cursor-pointer p-2 rounded-full hover:bg-accent relative flex items-center justify-center"
                >
                  <RotateCw className="h-7 w-7 text-muted-foreground font-thin stroke-1" />
                  <span className="absolute leading-none text-muted-foreground text-xs top-1/2 -translate-y-1/2">
                    15
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <button
                  onClick={toggleShuffle}
                  className={`p-2 cursor-pointer rounded-full hover:bg-accent ${
                    shuffle ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Shuffle className="h-6 w-6" />
                </button>
              </div>
              <div className="col-span-2 flex justify-center">
                <VolumeSlider volume={volume} onVolumeChange={setVolume} />
              </div>
              <div className="col-span-1">
                <button
                  onClick={toggleRepeat}
                  className={`p-2 cursor-pointer rounded-full hover:bg-accent ${
                    repeatMode !== "off"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <RepeatIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
