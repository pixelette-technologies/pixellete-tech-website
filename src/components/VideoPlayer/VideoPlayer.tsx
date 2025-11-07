'use client';

import React, { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className,
  style,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Add event listeners
      video.addEventListener('loadstart', () => {
        // Video loading started
      });

      video.addEventListener('loadedmetadata', () => {
        // Video metadata loaded
      });

      video.addEventListener('loadeddata', () => {
        // Video data loaded
      });

      video.addEventListener('canplay', () => {
        // Video can start playing
      });

      video.addEventListener('error', () => {
        // Video error occurred
      });

      // Ensure video plays when component mounts
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch(() => {
            // Video autoplay failed
          });
      }
    }
  }, [src]);

  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      margin: '2rem auto',
      display: 'block',
      backgroundColor: '#000',
      padding: '1rem',
      borderRadius: '8px',
    }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload="auto"
        className={className}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          minHeight: '300px',
          backgroundColor: '#000',
          ...style,
        }}
        onError={() => {
          // Video error handler
        }}
      >
        <source src={src} type="video/mp4" />
        <track kind="captions" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
