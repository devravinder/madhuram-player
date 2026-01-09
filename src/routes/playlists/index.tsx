import PlayList from '@/components/playlist/PlayList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playlists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PlayList/>
}
