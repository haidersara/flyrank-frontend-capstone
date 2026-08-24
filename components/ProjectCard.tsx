"use client";

import { useRef, useState } from "react";

type ProjectCardProps = {
  title: string;
  tag: string; // e.g. "Flutter Mobile", "WordPress"
  videoSrc: string;
  posterSrc: string;
  accentColor: string; // hex pulled from a frame of the video
};

export default function ProjectCard({
  title,
  tag,
  videoSrc,
  posterSrc,
  accentColor,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="project-card-wrapper"
      style={{ ["--glow-color" as string]: accentColor }}
    >
      <div className={`project-glow ${isHovering ? "project-glow-active" : ""}`} />
      <div
        ref={cardRef}
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="project-video"
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
        />
        <div className="project-title-bar">
          <span className="project-title">{title}</span>
          <span className="project-tag">{tag}</span>
        </div>
      </div>
    </div>
  );
}