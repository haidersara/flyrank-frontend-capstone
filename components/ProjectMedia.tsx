"use client";

import { useRef, useState } from "react";

type ProjectMediaProps = {
  video: string | null;
  poster: string | null;
  accent: string;
};

export default function ProjectMedia({ video, poster, accent }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  if (!video) return null;

  return (
    <div
      className="relative -m-6 mb-4"
      style={{ ["--glow-color" as string]: accent }}
      onMouseEnter={() => {
        setIsHovering(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className={`project-glow ${isHovering ? "project-glow-active" : ""}`} />
      <div className="relative overflow-hidden rounded-t-lg">
        <video
          ref={videoRef}
          className="project-video"
          src={video}
          poster={poster ?? undefined}
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}