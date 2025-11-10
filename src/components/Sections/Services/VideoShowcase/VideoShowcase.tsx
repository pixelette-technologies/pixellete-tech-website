'use client';

import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styles from './videoshowcase.module.css';
import Link from 'next/link';
import { Button } from '@/components/Feature/Button/Button';

export type VideoShowcaseItem = {
  id: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string; // e.g., "2:45"
  title: string;
  description: string;
};

type VideoShowcaseProps = {
  title: string;
  subtitle: string;
  videos: VideoShowcaseItem[];
};

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  title,
  subtitle,
  videos,
}) => {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideos(prev => ({ ...prev, [videoId]: true }));
  };

  const handleVideoPause = (videoId: string) => {
    setPlayingVideos(prev => ({ ...prev, [videoId]: false }));
  };

  const handlePlayButtonClick = (videoId: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const video = videoRefs.current[videoId];
    if (video) {
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  const handleVideoClick = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      } else {
        video.pause();
      }
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.videoShowcase}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {videos.map(video => (
            <div
              key={video.id}
              className={styles.card}
            >
              <div className={styles.thumbnailContainer}>
                {video.videoUrl
                  ? (
                      <>
                        <video
                          ref={(el) => {
                            videoRefs.current[video.id] = el;
                          }}
                          src={video.videoUrl}
                          poster={video.thumbnail}
                          muted
                          className={styles.video}
                          onClick={e => handleVideoClick(video.id, e)}
                          onPlay={() => handleVideoPlay(video.id)}
                          onPause={() => handleVideoPause(video.id)}
                          onError={(e) => {
                            console.error('Video error:', e);
                          }}
                        >
                          <source src={video.videoUrl} type="video/mp4" />
                          <track kind="captions" srcLang="en" label="English captions" />
                          Your browser does not support the video tag.
                        </video>

                        {!playingVideos[video.id] && (
                          <div
                            className={styles.playButtonOverlay}
                            onClick={e => handlePlayButtonClick(video.id, e)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handlePlayButtonClick(video.id, e);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <div className={styles.playButton}>
                              <svg
                                width="80"
                                height="80"
                                viewBox="0 0 80 80"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="40" cy="40" r="40" fill="#DC2626" />
                                <path
                                  d="M30 25L55 40L30 55V25Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                        {/* Duration Badge */}
                        <div className={styles.durationBadge}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.clockIcon}
                          >
                            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" fill="none" />
                            <line x1="8" y1="8" x2="8" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="8" y1="8" x2="11" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span>{video.duration}</span>
                        </div>
                      </>
                    )
                  : (
                      <>
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className={styles.thumbnail}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Play Button Overlay */}
                        <div className={styles.playButtonOverlay}>
                          <div className={styles.playButton}>
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 80 80"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="40" cy="40" r="40" fill="#DC2626" />
                              <path
                                d="M30 25L55 40L30 55V25Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Duration Badge */}
                        <div className={styles.durationBadge}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.clockIcon}
                          >
                            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" fill="none" />
                            <line x1="8" y1="8" x2="8" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="8" y1="8" x2="11" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span>{video.duration}</span>
                        </div>
                      </>
                    )}
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{video.title}</h3>
                <p className={styles.cardDescription}>{video.description}</p>
              </div>
            </div>
          ))}

        </div>
       <div className={styles.callToAction}>
       <p>Want to see how immersive technology can elevate your industry?</p>
          <Link href={'/contact-us'}>
              <Button className="primary">
                {'Book a discovery call'}
              </Button>
            </Link>
       </div>

      </div>
    </Container>
  );
};
