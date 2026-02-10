import { DEFAULT_SONG_IMAGE } from "@/constants";
import { getFile } from "@/services/filesService";
import { useEffect, useState } from "react";
import { CoverImg } from "./Elements";

export default function AudioImage({ id, alt, className="" }: { id?: string; alt?: string, className?: string }) {
  const [src, setSrc] = useState(DEFAULT_SONG_IMAGE);

  useEffect(() => {
    const getImageFile = async (id: string) => {
      const imageFile = await getFile(id);
      if (!imageFile) return;
      const url = URL.createObjectURL(imageFile.data);
      setSrc(url);

      return () => URL.revokeObjectURL(url);
    };
    if (id) getImageFile(id);
  }, [id]);

  return (
    <CoverImg
      src={src}
      alt={alt || "Song"}
      className={className}
    />
  );
}
