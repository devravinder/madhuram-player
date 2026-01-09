import PlayingSongCard from '@/components/songs/PlayingSongCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return ( <PlayingSongCard/>)
}