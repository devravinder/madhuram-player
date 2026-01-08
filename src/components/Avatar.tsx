import { useState } from "react";
import { AvatarContainer, Img, Uppercase } from "./Elements";

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0]
    : parts[0][0] + parts[parts.length - 1][0];
};

export default function Avatar({ src, name }: { src?: string; name?: string }) {
  const [error, setError] = useState(false);

  return (
    <AvatarContainer aria-label={name ?? "User avatar"} role="img">
      {src && !error ? (
        <Img
          src={src}
          alt={name ?? "User avatar"}
          onError={() => setError(true)}
        />
      ) : (
        <Uppercase>{getInitials(name)}</Uppercase>
      )}
    </AvatarContainer>
  );
}
