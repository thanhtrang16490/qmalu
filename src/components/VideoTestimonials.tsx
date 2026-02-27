/**
 * VideoTestimonials Component
 * 
 * Displays customer video testimonials with custom player controls.
 * Features: custom controls, keyboard shortcuts, modal/inline toggle,
 * auto-pause other videos, progress bar, volume control, fullscreen.
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8
 */

import React, { useEffect, useRef, useState } from 'react';
import type { VideoTestimonialsSection } from '../data/homepage-content';

interface VideoTestimonialsProps {
  section: VideoTestimonialsSection;
}

interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
}

export default function VideoTestimonials({ section }: VideoTestimonialsProps) {
  const { title, subtitle, testimonials } = section;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [playerStates, setPlayerStates] = useState<Map<string, VideoPlayerState>>(
    new Map(
      testimonials.map((t) => [
        t.id,
        {
          isPlaying: false,
          currentTime: 0,
          duration: t.duration,
          volume: 1,
          isMuted: false,
          isFullscreen: false,
        },
      ])
    )
  );

  // Get keyboard shortcuts text based on current language
  const getKeyboardShortcutsText = () => {
    if (typeof window === 'undefined') return {
      prefix: 'Phím tắt:',
      playPause: 'phát/tạm dừng',
      seek: 'tua',
      volume: 'âm lượng',
      fullscreen: 'toàn màn hình'
    };
    
    const path = window.location.pathname;
    
    if (path.startsWith('/en')) {
      return {
        prefix: 'Shortcuts:',
        playPause: 'play/pause',
        seek: 'seek',
        volume: 'volume',
        fullscreen: 'fullscreen'
      };
    } else if (path.startsWith('/cn')) {
      return {
        prefix: '快捷键：',
        playPause: '播放/暂停',
        seek: '快进/快退',
        volume: '音量',
        fullscreen: '全屏'
      };
    }
    
    return {
      prefix: 'Phím tắt:',
      playPause: 'phát/tạm dừng',
      seek: 'tua',
      volume: 'âm lượng',
      fullscreen: 'toàn màn hình'
    };
  };

  const shortcuts = getKeyboardShortcutsText();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!activeVideoId) return;

      const video = videoRefs.current.get(activeVideoId);
      if (!video) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlayPause(activeVideoId);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          const maxTime = isFinite(video.duration) ? video.duration : video.currentTime + 5;
          video.currentTime = Math.min(maxTime, video.currentTime + 5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          updatePlayerState(activeVideoId, { volume: video.volume });
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          updatePlayerState(activeVideoId, { volume: video.volume });
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen(activeVideoId);
          break;
        case 'm':
          e.preventDefault();
          toggleMute(activeVideoId);
          break;
        case 'Escape':
          if (activeVideoId) {
            closeVideo(activeVideoId);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [activeVideoId]);

  const updatePlayerState = (videoId: string, updates: Partial<VideoPlayerState>) => {
    setPlayerStates((prev) => {
      const newStates = new Map(prev);
      const currentState = newStates.get(videoId);
      if (currentState) {
        newStates.set(videoId, { ...currentState, ...updates });
      }
      return newStates;
    });
  };

  const openVideo = (videoId: string) => {
    // Pause all other videos (auto-pause feature)
    videoRefs.current.forEach((video, id) => {
      if (id !== videoId && !video.paused) {
        video.pause();
        updatePlayerState(id, { isPlaying: false });
      }
    });

    setActiveVideoId(videoId);
    const video = videoRefs.current.get(videoId);
    if (video) {
      video.play();
      updatePlayerState(videoId, { isPlaying: true });
    }
  };

  const closeVideo = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (video) {
      video.pause();
      video.currentTime = 0;
      updatePlayerState(videoId, { isPlaying: false, currentTime: 0 });
    }
    setActiveVideoId(null);
  };

  const togglePlayPause = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    if (video.paused) {
      video.play();
      updatePlayerState(videoId, { isPlaying: true });
    } else {
      video.pause();
      updatePlayerState(videoId, { isPlaying: false });
    }
  };

  const toggleMute = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    video.muted = !video.muted;
    updatePlayerState(videoId, { isMuted: video.muted });
  };

  const toggleFullscreen = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      updatePlayerState(videoId, { isFullscreen: true });
    } else {
      document.exitFullscreen();
      updatePlayerState(videoId, { isFullscreen: false });
    }
  };

  const handleVolumeChange = (videoId: string, volume: number) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    video.volume = volume;
    updatePlayerState(videoId, { volume, isMuted: volume === 0 });
  };

  const handleSeek = (videoId: string, time: number) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    video.currentTime = time;
    updatePlayerState(videoId, { currentTime: time });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    updatePlayerState(videoId, {
      currentTime: video.currentTime,
      duration: video.duration || 0,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => {
            const state = playerStates.get(testimonial.id);
            const isActive = activeVideoId === testimonial.id;

            return (
              <div key={testimonial.id} className="group">
                {/* Video Thumbnail/Player */}
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(testimonial.id, el);
                    }}
                    poster={testimonial.posterImage}
                    className="w-full h-full object-cover"
                    onTimeUpdate={() => handleTimeUpdate(testimonial.id)}
                    onEnded={() => closeVideo(testimonial.id)}
                    playsInline
                    preload="none"
                    loading="lazy"
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play Button Overlay (when not playing) */}
                  {!state?.isPlaying && (
                    <button
                      onClick={() => openVideo(testimonial.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300 group"
                      aria-label={`Play video testimonial from ${testimonial.customerName}`}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-primary-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}

                  {/* Custom Controls (when playing) */}
                  {state?.isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <input
                          type="range"
                          min="0"
                          max={state.duration || 100}
                          value={state.currentTime || 0}
                          onChange={(e) =>
                            handleSeek(testimonial.id, parseFloat(e.target.value))
                          }
                          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                          aria-label="Video progress"
                        />
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {/* Play/Pause */}
                          <button
                            onClick={() => togglePlayPause(testimonial.id)}
                            className="text-white hover:text-primary-400 transition-colors"
                            aria-label={state.isPlaying ? 'Pause' : 'Play'}
                          >
                            {state.isPlaying ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>

                          {/* Volume */}
                          <div className="flex items-center gap-2 group/volume">
                            <button
                              onClick={() => toggleMute(testimonial.id)}
                              className="text-white hover:text-primary-400 transition-colors"
                              aria-label={state.isMuted ? 'Unmute' : 'Mute'}
                            >
                              {state.isMuted || state.volume === 0 ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                </svg>
                              )}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={state.volume}
                              onChange={(e) =>
                                handleVolumeChange(testimonial.id, parseFloat(e.target.value))
                              }
                              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider opacity-0 group-hover/volume:opacity-100 transition-opacity"
                              aria-label="Volume"
                            />
                          </div>

                          {/* Time Display */}
                          <span className="text-white text-sm font-medium">
                            {formatTime(state.currentTime)} / {formatTime(state.duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Fullscreen */}
                          <button
                            onClick={() => toggleFullscreen(testimonial.id)}
                            className="text-white hover:text-primary-400 transition-colors"
                            aria-label="Fullscreen"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                            </svg>
                          </button>

                          {/* Close (mobile) */}
                          {isMobile && (
                            <button
                              onClick={() => closeVideo(testimonial.id)}
                              className="text-white hover:text-primary-400 transition-colors"
                              aria-label="Close"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                    {testimonial.customerName}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Desktop (optional enhancement) */}
        {!isMobile && activeVideoId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => closeVideo(activeVideoId)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => closeVideo(activeVideoId)}
                className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              {/* Video content is already rendered in the grid */}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            {shortcuts.prefix} <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> {shortcuts.playPause},{' '}
            <kbd className="px-2 py-1 bg-gray-100 rounded">←→</kbd> {shortcuts.seek},{' '}
            <kbd className="px-2 py-1 bg-gray-100 rounded">↑↓</kbd> {shortcuts.volume},{' '}
            <kbd className="px-2 py-1 bg-gray-100 rounded">F</kbd> {shortcuts.fullscreen}
          </p>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #175ead;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #175ead;
          cursor: pointer;
          border: none;
        }

        .slider::-webkit-slider-runnable-track {
          background: linear-gradient(
            to right,
            #175ead 0%,
            #175ead var(--progress, 0%),
            #4b5563 var(--progress, 0%),
            #4b5563 100%
          );
        }

        kbd {
          font-family: monospace;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
}
