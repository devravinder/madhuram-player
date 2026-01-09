import { staticSongs } from "@/data/songs"

export const fetchPlayListDetails=async(id: string)=>{
   return ({
    id,
    name: `Test Playlist ${id}`,
    desciption: `Enjoy the oldendays melodies`,
    songs: staticSongs.slice(Math.floor(Math.random()*staticSongs.length))
   })
}