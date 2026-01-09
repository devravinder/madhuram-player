import SongsList from '@/components/songs/SongsList'
import { staticSongs } from '@/data/songs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return ( <SongsList songs={staticSongs}/>)
}