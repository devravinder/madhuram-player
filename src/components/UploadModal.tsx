import { addSong } from "@/services/songsService";
import type { Song } from "@/types/music";
import { Import } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { parseBlob, type IPicture } from "music-metadata";
import { useNavigate } from "@tanstack/react-router";
import { saveFile } from "@/services/filesService";
import { UNKNOWN } from "@/constants";



function pictureToFile(picture: IPicture) {
  const blob = new Blob([picture.data as unknown as ArrayBuffer], {
    type: picture.format
  });

  const ext = picture.format.split("/")[1]; // jpeg / png
  const fileName = `cover.${ext}`;

  return new File([blob], fileName, {
    type: picture.format
  });
}


const allowedTypes = [
  "audio/mpeg", // mp3
  "audio/wav",
  "audio/mp4", // m4a
  "audio/aac",
  "audio/ogg",
];

export function UploadModal() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const handleCancel = () => {
      setIsOpening(false);
    };

    input.addEventListener("cancel", handleCancel);

    return () => input.removeEventListener("cancel", handleCancel);
  }, []);

  const uploadFile = async (file: File) => {

    const audioFile = await saveFile(file)

    const metadata = await parseBlob(file);

    const title =
      metadata.common.title || file.name.replace(/\.[^/.]+$/, "") || "uploaded";

    const artist = metadata.common.artist || UNKNOWN;
    const album = metadata.common.album || UNKNOWN;

    let coverImageId = undefined;

    if(metadata.common.picture?.[0]){
      const converPic = pictureToFile(metadata.common.picture[0])
      const imageFile = await saveFile(converPic)
      coverImageId = imageFile.id
    }

    const duration = Math.floor(metadata.format.duration || 0);

    const song: Omit<Song, "id"> = {
      title,
      artist,
      album,
      duration, // in seconds
      audioId: audioFile.id,
      coverImageId,
      addedAt: new Date(),
    };

    await addSong(song);
  };

  const uploadFiles = async (files: FileList) => {
    for (const file of files) {
      await uploadFile(file!);
    }
    navigate({ to: "/library" });
  };

  const onChange = async (files: FileList | null) => {
    if (!files || !files.item(0)) return;

    await uploadFiles(files);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const invalidFiles = Array.from(files).filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      alert("Only audio files are allowed!");
      console.log("Invalid files:", invalidFiles);
      return false;
    }

    await uploadFiles(files);
  };

  const openFiles = () => {
    setIsOpening(true);
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-4 p-4 justify-center">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold">Import Music</h2>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <Import size={32} className="text-muted-foreground" />
          </div>
          <p className="font-medium mb-2">Drag & drop audio files here</p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports MP3, WAV, FLAC, AAC
          </p>
          <button
            onClick={openFiles}
            disabled={isOpening}
            className={`disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center p-3 rounded-xl transition-colors bg-primary/10 text-primary`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.m4a,audio/*"
              className="hidden"
              multiple={true}
              onChange={(e) => {
                onChange?.(e.currentTarget.files);
                setIsOpening(false);
              }}
            />
            Choose Files
          </button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Note: upload only audio files
        </p>
      </div>
    </div>
  );
}
