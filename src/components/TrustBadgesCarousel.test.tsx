/**
 * TrustBadgesCarousel Component Tests
 * 
 * Unit tests for the TrustBadgesCarousel component covering:
 * - Rendering with correct data
 * - Infinite scroll animation
 * - Pause on hover functionality
 * - Grayscale filter behavior
 * - Accessibility features
 */

import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TrustBadgesCarousel from './TrustBadgesCarousel';
import type { TrustBadgesCarouselSection } from '../data/homepage-content';

describe('TrustBadgesCarousel', () => {
  const mockSection: TrustBadgesCarouselSection = {
    title: 'Đối tác & Chứng nhận',
    subtitle: 'Được tin tưởng bởi các tổ chức uy tín',
    badges: [
      {
        id: 'iso-9001',
        name: 'ISO 9001:2015',
        logo: '/images/badges/iso-9001.svg',
        type: 'certification'
      },
      {
        id: 'iso-14001',
        name: 'ISO 14001:2015',
        logo: '/images/badges/iso-14001.svg',
        type: 'certification'
      },
      {
        id: 'partner-1',
        name: 'Vingroup',
        logo: '/images/badges/vingroup.svg',
        type: 'partner'
      },
      {
        id: 'partner-2',
        name: 'Hòa Phát',
        logo: '/images/badges/hoa-phat.svg',
        type: 'partner'
      },
      {
        id: 'partner-3',
        name: 'Coteccons',
        logo: '/images/badges/coteccons.svg',
        type: 'partner'
      },
      {
        id: 'partner-4',
        name: 'Hưng Thịnh',
        logo: '/images/badges/hung-thinh.svg',
        type: 'partner'
      },
      {
        id: 'partner-5',
        name: 'Novaland',
        logo: '/images/badges/novaland.svg',
        type: 'partner'
      },
      {
        id: 'partner-6',
        name: 'Vinhomes',
        logo: '/images/badges/vinhomes.svg',
        type: 'partner'
      }
    ],
    speed: 50
  };

  beforeEach(() => {
    // Mock scrollWidth for animation duration calculation
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 2000,
    });
  });

  describe('Rendering', () => {
    it('should render section title and subtitle', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      expect(screen.getByText('Đối tác & Chứng nhận')).toBeInTheDocument();
      expect(screen.getByText('Được tin tưởng bởi các tổ chức uy tín')).toBeInTheDocument();
    });

    it('should render all badges with correct attributes', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      // Should have duplicated badges (8 original + 8 duplicated = 16)
      expect(images).toHaveLength(16);
      
      // Check first badge
      const firstBadge = images[0];
      expect(firstBadge).toHaveAttribute('src', '/images/badges/iso-9001.svg');
      expect(firstBadge).toHaveAttribute('alt', 'ISO 9001:2015');
      expect(firstBadge).toHaveAttribute('loading', 'lazy');
      expect(firstBadge).toHaveAttribute('decoding', 'async');
    });

    it('should duplicate badges array for seamless loop', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      // Verify duplication by checking that first and middle badges are the same
      expect(images[0]).toHaveAttribute('alt', images[8].getAttribute('alt'));
      expect(images[1]).toHaveAttribute('alt', images[9].getAttribute('alt'));
    });

    it('should apply consistent sizing and spacing to badges', () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const badgeContainers = container.querySelectorAll('.flex-shrink-0');
      
      badgeContainers.forEach((badge) => {
        // Check that badge has consistent size classes
        expect(badge.className).toContain('w-32');
        expect(badge.className).toContain('h-32');
        expect(badge.className).toContain('md:w-40');
        expect(badge.className).toContain('md:h-40');
      });
    });
  });

  describe('Infinite Scroll Animation', () => {
    it('should apply scroll animation with calculated duration', async () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const track = container.querySelector('.flex.gap-8');
      
      await waitFor(() => {
        const style = track?.getAttribute('style');
        expect(style).toContain('animation-name: scroll');
        expect(style).toContain('animation-timing-function: linear');
        expect(style).toContain('animation-iteration-count: infinite');
      });
    });

    it('should calculate duration based on speed (50px/s)', async () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const track = container.querySelector('.flex.gap-8');
      
      await waitFor(() => {
        const style = track?.getAttribute('style');
        // scrollWidth is 2000, half is 1000, speed is 50px/s
        // Expected duration: 1000 / 50 = 20s
        expect(style).toContain('animation-duration: 20s');
      });
    });

    it('should use custom speed when provided', async () => {
      const customSection = { ...mockSection, speed: 100 };
      const { container } = render(<TrustBadgesCarousel section={customSection} />);
      
      const track = container.querySelector('.flex.gap-8');
      
      await waitFor(() => {
        const style = track?.getAttribute('style');
        // scrollWidth is 2000, half is 1000, speed is 100px/s
        // Expected duration: 1000 / 100 = 10s
        expect(style).toContain('animation-duration: 10s');
      });
    });
  });

  describe('Pause on Hover', () => {
    it('should pause animation when mouse enters', async () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const carouselContainer = container.querySelector('.relative');
      const track = container.querySelector('.flex.gap-8');
      
      if (!carouselContainer || !track) {
        throw new Error('Carousel elements not found');
      }
      
      // Initially running
      await waitFor(() => {
        expect(track.getAttribute('style')).toContain('animation-play-state: running');
      });
      
      // Hover over carousel
      fireEvent.mouseEnter(carouselContainer);
      
      // Should be paused
      await waitFor(() => {
        expect(track.getAttribute('style')).toContain('animation-play-state: paused');
      });
    });

    it('should resume animation when mouse leaves', async () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const carouselContainer = container.querySelector('.relative');
      const track = container.querySelector('.flex.gap-8');
      
      if (!carouselContainer || !track) {
        throw new Error('Carousel elements not found');
      }
      
      // Hover and then unhover
      fireEvent.mouseEnter(carouselContainer);
      fireEvent.mouseLeave(carouselContainer);
      
      // Should be running again
      await waitFor(() => {
        expect(track.getAttribute('style')).toContain('animation-play-state: running');
      });
    });
  });

  describe('Grayscale Filter', () => {
    it('should apply grayscale filter to all badge images', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      images.forEach((img) => {
        expect(img.className).toContain('grayscale');
        expect(img.className).toContain('hover:grayscale-0');
      });
    });

    it('should have smooth transition for filter changes', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      images.forEach((img) => {
        expect(img.className).toContain('transition-all');
        expect(img.className).toContain('duration-300');
      });
    });
  });

  describe('Accessibility', () => {
    it('should provide screen reader accessible list of badges', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      // Check for screen reader only heading
      const srHeading = screen.getByText('Đối tác và chứng nhận:');
      expect(srHeading).toBeInTheDocument();
      expect(srHeading.parentElement).toHaveClass('sr-only');
    });

    it('should list all badges for screen readers', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      // Check that all badge names are present in screen reader list
      expect(screen.getByText(/ISO 9001:2015 - Chứng nhận/)).toBeInTheDocument();
      expect(screen.getByText(/ISO 14001:2015 - Chứng nhận/)).toBeInTheDocument();
      expect(screen.getByText(/Vingroup - Đối tác/)).toBeInTheDocument();
      expect(screen.getByText(/Hòa Phát - Đối tác/)).toBeInTheDocument();
    });

    it('should have proper alt text for all images', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive badge sizes', () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const badgeContainers = container.querySelectorAll('.flex-shrink-0');
      
      badgeContainers.forEach((badge) => {
        // Mobile: w-32 h-32
        expect(badge.className).toContain('w-32');
        expect(badge.className).toContain('h-32');
        
        // Desktop: md:w-40 md:h-40
        expect(badge.className).toContain('md:w-40');
        expect(badge.className).toContain('md:h-40');
      });
    });

    it('should have responsive spacing', () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const track = container.querySelector('.flex');
      
      // Mobile: gap-8, Desktop: md:gap-12
      expect(track?.className).toContain('gap-8');
      expect(track?.className).toContain('md:gap-12');
    });

    it('should have responsive gradient overlays', () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const gradients = container.querySelectorAll('.absolute.bg-gradient-to-r, .absolute.bg-gradient-to-l');
      
      gradients.forEach((gradient) => {
        // Mobile: w-24, Desktop: md:w-32
        expect(gradient.className).toContain('w-24');
        expect(gradient.className).toContain('md:w-32');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum 8 badges requirement', () => {
      render(<TrustBadgesCarousel section={mockSection} />);
      
      const images = screen.getAllByRole('img');
      
      // 8 original + 8 duplicated = 16
      expect(images.length).toBeGreaterThanOrEqual(16);
    });

    it('should handle missing speed prop with default value', async () => {
      const sectionWithoutSpeed = { ...mockSection, speed: undefined };
      const { container } = render(<TrustBadgesCarousel section={sectionWithoutSpeed} />);
      
      const track = container.querySelector('.flex.gap-8');
      
      await waitFor(() => {
        const style = track?.getAttribute('style');
        // Default speed is 50px/s, so duration should be 20s
        expect(style).toContain('animation-duration: 20s');
      });
    });

    it('should render gradient overlays for fade effect', () => {
      const { container } = render(<TrustBadgesCarousel section={mockSection} />);
      
      const leftGradient = container.querySelector('.bg-gradient-to-r.from-gray-50');
      const rightGradient = container.querySelector('.bg-gradient-to-l.from-gray-50');
      
      expect(leftGradient).toBeInTheDocument();
      expect(rightGradient).toBeInTheDocument();
      
      // Should be positioned correctly
      expect(leftGradient?.className).toContain('left-0');
      expect(rightGradient?.className).toContain('right-0');
    });
  });
});
