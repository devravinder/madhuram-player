import { Import } from "lucide-react";
import React, { useState } from "react";

export function UploadModal() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Dummy upload - just close modal
  };

  const handleFileSelect = () => {
    // Dummy upload - just close modal
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
            onClick={handleFileSelect}
            className={`disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center p-3 rounded-xl transition-colors bg-primary/10 text-primary`}
          >
            Choose Files
          </button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Note: This is a demo feature. Files won't actually be uploaded.
        </p>
      </div>
    </div>
  );
}
