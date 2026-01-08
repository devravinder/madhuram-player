import Player from "../player/Player";
import SongsList from "../SongsList";


export default function MainContent() {
  return (
    <div className="h-full flex flex-col">
      <SongsList/>
      <Player />
    </div>
  );
}
