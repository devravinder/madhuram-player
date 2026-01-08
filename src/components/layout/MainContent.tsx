import MiniPlayer from "../player/MiniPlayer";
import SongsList from "../SongsList";


export default function MainContent() {
  return (
    <div className="h-full flex flex-col">
      <SongsList/>
      <MiniPlayer />
    </div>
  );
}
