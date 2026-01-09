import { usePlaylists } from "@/context/PlaylistContext";
import { staticSongs } from "@/data/songs";
import type { Playlist } from "@/types/music";
import { Check, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";

interface EditPlaylistModalProps {
  playlist: Omit<Playlist, "createdAt" | "updatedAt">;
  onClose: () => void;
  onDelete: () => void;
}

export function EditPlaylistModal({
  playlist,
  onClose,
  onDelete,
}: EditPlaylistModalProps) {
  const {
    createPlaylist,
    updatePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  } = usePlaylists();
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description || "");
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(
    new Set(playlist.songIds)
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(playlist.name);
    setDescription(playlist.description || "");
    setSelectedSongs(new Set(playlist.songIds));
  }, [playlist]);

  const handleSave = () => {
    if (playlist.id) {
      updatePlaylist(playlist.id, {
        name,
        description: description || undefined,
      });

      // Handle song additions and removals
      const currentSongs = new Set(playlist.songIds);
      selectedSongs.forEach((songId) => {
        if (!currentSongs.has(songId)) {
          addSongToPlaylist(playlist.id!, songId);
        }
      });
      currentSongs.forEach((songId) => {
        if (!selectedSongs.has(songId)) {
          removeSongFromPlaylist(playlist.id!, songId);
        }
      });
    } else {
      createPlaylist(playlist);
    }

    onClose();
  };

  const toggleSong = (songId: string) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  return (
    <Modal>
      <div className="w-full max-w-md mx-auto h-full p-4 flex flex-col">
        <div className="bg-card rounded-3xl p-4" onClick={onClose}>
          <div
            className="w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit Playlist</h2>
              <button onClick={onClose} className="btn-icon p-2">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field resize-none h-16"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Songs
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto border border-border rounded-xl p-2">
                  {staticSongs.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => toggleSong(song.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        selectedSongs.has(song.id)
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-secondary/50"
                      }`}
                    >
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium truncate">
                          {song.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {song.artist}
                        </p>
                      </div>
                      {selectedSongs.has(song.id) && (
                        <Check size={18} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-border">
              <button
                onClick={onDelete}
                className="btn-ghost text-destructive flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
              <div className="flex-1" />
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
                disabled={!name.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
