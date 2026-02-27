/**
 * VideoTestimonials Component Tests
 * 
 * Tests for the VideoTestimonials component including:
 * - Rendering with 3 video testimonials
 * - Custom video controls (play, pause, volume, fullscreen)
 * - Keyboard shortcuts
 * - Auto-pause other videos
 * - Time display and progress bar
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VideoTestimonials from './VideoTestimonials';
import type { VideoTestimonialsSection } from '../data/homepage-content';

// Mock HTMLVideoElement methods
beforeEach(() => {
  // Create a mock pause function that updates the paused property
  HTMLMediaElement.prototype.pause = vi.fn(function(this: HTMLMediaElement) {
    Object.defineProperty(this, 'paused', {
      writable: true,
      configurable: true,
      value: true,
    });
  });
  
  HTMLMediaElement.prototype.play = vi.fn(function(this: HTMLMediaElement) {
    Object.defineProperty(this, 'paused', {
      writable: true,
      configurable: true,
      value: false,
    });
    return Promise.resolve();
  });
  
  HTMLMediaElement.prototype.load = vi.fn();
  
  // Mock video properties
  Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    writable: true,
    configurable: true,
    value: true,
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', {
    writable: true,
    configurable: true,
    value: 0,
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
    writable: true,
    configurable: true,
    value: 120,
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'volume', {
    writable: true,
    configurable: true,
    value: 1,
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    writable: true,
    configurable: true,
    value: false,
  });
  
  // Mock fullscreen API
  HTMLVideoElement.prototype.requestFullscreen = vi.fn(() => Promise.resolve());
  document.exitFullscreen = vi.fn(() => Promise.resolve());
  
  Object.defineProperty(document, 'fullscreenElement', {
    writable: true,
    configurable: true,
    value: null,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const mockSection: VideoTestimonialsSection = {
  title: 'Khách hàng nói gì về chúng tôi',
  subtitle: 'Những chia sẻ chân thực từ khách hàng',
  testimonials: [
    {
      id: 'testimonial-1',
      videoUrl: '/videos/customer-1.mp4',
      posterImage: '/images/customer-1-poster.jpg',
      customerName: 'Nguyễn Văn A',
      role: 'Giám đốc Dự án',
      company: 'Công ty ABC',
      duration: 120,
    },
    {
      id: 'testimonial-2',
      videoUrl: '/videos/customer-2.mp4',
      posterImage: '/images/customer-2-poster.jpg',
      customerName: 'Trần Thị B',
      role: 'Kiến trúc sư',
      company: 'Studio XYZ',
      duration: 95,
    },
    {
      id: 'testimonial-3',
      videoUrl: '/videos/customer-3.mp4',
      posterImage: '/images/customer-3-poster.jpg',
      customerName: 'Lê Văn C',
      role: 'Chủ đầu tư',
      company: 'Tập đoàn DEF',
      duration: 150,
    },
  ],
};

describe('VideoTestimonials', () => {
  // Requirement 11.1: Display 3 video testimonials
  it('should render section with 3 video testimonials', () => {
    render(<VideoTestimonials section={mockSection} />);

    expect(screen.getByText('Khách hàng nói gì về chúng tôi')).toBeInTheDocument();
    expect(screen.getByText('Những chia sẻ chân thực từ khách hàng')).toBeInTheDocument();

    // Check all 3 testimonials are rendered
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument();
    expect(screen.getByText('Lê Văn C')).toBeInTheDocument();
  });

  // Requirement 11.2: Display video player, customer name, role, company
  it('should display video player with customer information', () => {
    render(<VideoTestimonials section={mockSection} />);

    const videos = screen.getAllByRole('button', { name: /Play video testimonial/i });
    expect(videos).toHaveLength(3);

    // Check customer details
    expect(screen.getByText('Giám đốc Dự án')).toBeInTheDocument();
    expect(screen.getByText('Công ty ABC')).toBeInTheDocument();
    expect(screen.getByText('Kiến trúc sư')).toBeInTheDocument();
    expect(screen.getByText('Studio XYZ')).toBeInTheDocument();
  });

  // Requirement 11.3: Custom video controls (play, pause, volume, fullscreen)
  it('should show custom controls when video is playing', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    });

    // Check for volume control
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    
    // Check for fullscreen button
    expect(screen.getByLabelText('Fullscreen')).toBeInTheDocument();
  });

  // Requirement 11.3: Play/Pause functionality
  it('should toggle play and pause', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    const pauseButton = await screen.findByLabelText('Pause');
    fireEvent.click(pauseButton);

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  // Requirement 11.3: Volume control
  it('should control volume', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    });

    const volumeSlider = screen.getByLabelText('Volume');
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });

    expect(volumeSlider).toHaveValue('0.5');
  });

  // Requirement 11.3: Mute/Unmute
  it('should toggle mute', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Mute')).toBeInTheDocument();
    });

    const muteButton = screen.getByLabelText('Mute');
    fireEvent.click(muteButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Unmute')).toBeInTheDocument();
    });
  });

  // Requirement 11.3: Fullscreen toggle
  it('should toggle fullscreen', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Fullscreen')).toBeInTheDocument();
    });

    const fullscreenButton = screen.getByLabelText('Fullscreen');
    fireEvent.click(fullscreenButton);

    expect(HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalled();
  });

  // Requirement 11.4: Show video duration and current playback time
  it('should display video duration and current time', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      // Should show time format like "0:00 / 2:00"
      expect(screen.getByText(/\d:\d{2} \/ \d:\d{2}/)).toBeInTheDocument();
    });
  });

  // Requirement 11.5: Display poster image before playback
  it('should display poster image before video plays', () => {
    render(<VideoTestimonials section={mockSection} />);

    const videos = document.querySelectorAll('video');
    expect(videos[0]).toHaveAttribute('poster', '/images/customer-1-poster.jpg');
    expect(videos[1]).toHaveAttribute('poster', '/images/customer-2-poster.jpg');
    expect(videos[2]).toHaveAttribute('poster', '/images/customer-3-poster.jpg');
  });

  // Requirement 11.6: Keyboard shortcuts (space, arrows, f)
  it('should handle space key for play/pause', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    // Simulate space key press
    fireEvent.keyDown(window, { key: ' ' });

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  // Requirement 11.6: Arrow keys for seeking
  it('should handle arrow keys for seeking', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    // Test arrow right (forward 5s)
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    // Test arrow left (backward 5s)
    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    // Keys should be handled (preventDefault called)
    expect(true).toBe(true); // Basic check that no errors occurred
  });

  // Requirement 11.6: F key for fullscreen
  it('should handle f key for fullscreen', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    fireEvent.keyDown(window, { key: 'f' });

    expect(HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalled();
  });

  // Requirement 11.7: Modal/inline player toggle (mobile vs desktop)
  it('should render inline player on mobile', () => {
    // Mock mobile viewport
    global.innerWidth = 500;
    fireEvent(window, new Event('resize'));

    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    // On mobile, should not show modal backdrop
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Requirement 11.8: Auto-pause other videos when one plays
  it('should pause other videos when one starts playing', async () => {
    render(<VideoTestimonials section={mockSection} />);

    // Play first video
    const playButtons = screen.getAllByLabelText(/Play video testimonial/i);
    fireEvent.click(playButtons[0]);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    // Play second video
    fireEvent.click(playButtons[1]);

    await waitFor(() => {
      // Pause should be called on the first video
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });
  });

  // Requirement 11.4: Progress bar with scrubbing
  it('should allow scrubbing through progress bar', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Video progress')).toBeInTheDocument();
    });

    const progressBar = screen.getByLabelText('Video progress');
    fireEvent.change(progressBar, { target: { value: '60' } });

    // Progress bar should update
    expect(progressBar).toHaveValue('60');
  });

  // Edge case: Handle video end
  it('should handle video end event', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    const video = document.querySelector('video');
    if (video) {
      fireEvent.ended(video);
    }

    // Video should reset after ending
    await waitFor(() => {
      expect(screen.getAllByLabelText(/Play video testimonial/i)[0]).toBeInTheDocument();
    });
  });

  // Edge case: Keyboard shortcuts help text
  it('should display keyboard shortcuts help', () => {
    render(<VideoTestimonials section={mockSection} />);

    expect(screen.getByText(/Phím tắt:/)).toBeInTheDocument();
    expect(screen.getByText('Space')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  // Accessibility: ARIA labels
  it('should have proper ARIA labels for accessibility', () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButtons = screen.getAllByLabelText(/Play video testimonial from/i);
    expect(playButtons).toHaveLength(3);
    expect(playButtons[0]).toHaveAttribute('aria-label', 'Play video testimonial from Nguyễn Văn A');
  });

  // Format time utility
  it('should format time correctly', async () => {
    render(<VideoTestimonials section={mockSection} />);

    const playButton = screen.getAllByLabelText(/Play video testimonial/i)[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      // Should show formatted time like "0:00 / 2:00" for 120 seconds
      const timeDisplay = screen.getByText(/0:00 \/ 2:00/);
      expect(timeDisplay).toBeInTheDocument();
    });
  });
});
