import tw from "tailwind-styled-components";

const Wave = tw.div<{$start:boolean}>`${p => p.$start ? 'animate-wave' : 'h-[30%]' }
 shrink-0 min-w-1 w-1 bg-linear-to-t from-emerald-500 to-emerald-300 rounded-full transition-all`

export default function Waves({ start, noOfWaves=5 }: { start: boolean, noOfWaves?: number }) {
  return (
    <div className="w-full h-full shrink-0 flex flex-row  justify-between items-center">
      {[...Array(noOfWaves)].map((_, i) => (
        <Wave
          key={i}
          $start={start}
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
