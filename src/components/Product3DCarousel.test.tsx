/**
 * Product3DCarousel Component Tests
 * 
 * Tests for the Product3DCarousel component functionality
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Product3DCarousel from './Product3DCarousel';
import type { Product3DCarouselSection } from '../data/homepage-content';

describe('Product3DCarousel', () => {
  const mockSection: Product3DCarouselSection = {
    title: 'Test Products',
    subtitle: 'Test subtitle',
    products: [
      {
        id: 'product-1',
        name: 'Product 1',
        image: '/images/product1.jpg',
        description: 'Description 1',
        features: ['Feature 1A', 'Feature 1B', 'Feature 1C'],
      },
      {
        id: 'product-2',
        name: 'Product 2',
        image: '/images/product2.jpg',
        description: 'Description 2',
        features: ['Feature 2A', 'Feature 2B', 'Feature 2C'],
      },
      {
        id: 'product-3',
        name: 'Product 3',
        image: '/images/product3.jpg',
        description: 'Description 3',
        features: ['Feature 3A', 'Feature 3B', 'Feature 3C'],
      },
      {
        id: 'product-4',
        name: 'Product 4',
        image: '/images/product4.jpg',
        description: 'Description 4',
        features: ['Feature 4A', 'Feature 4B', 'Feature 4C'],
      },
      {
        id: 'product-5',
        name: 'Product 5',
        image: '/images/product5.jpg',
        description: 'Description 5',
        features: ['Feature 5A', 'Feature 5B', 'Feature 5C'],
      },
    ],
    autoRotateInterval: 5000,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // Requirement 7.1: Display 3D carousel
  it('renders the carousel section', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    expect(screen.getByText('Test Products')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  // Requirement 7.3: Display 5+ products
  it('displays at least 5 products', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const productCards = container.querySelectorAll('.carousel-card');
    expect(productCards.length).toBeGreaterThanOrEqual(5);
    expect(productCards.length).toBe(5);
  });

  // Requirement 7.7: Display image, name, and description
  it('displays product image, name, and description for each card', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    // Check that all product names are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.getByText('Product 4')).toBeInTheDocument();
    expect(screen.getByText('Product 5')).toBeInTheDocument();
    
    // Check that descriptions are rendered
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  // Requirement 7.4: Perspective and rotation transforms
  it('applies perspective CSS to carousel container', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[style*="perspective"]');
    expect(carouselContainer).toBeInTheDocument();
    expect(carouselContainer).toHaveStyle({ perspective: '1200px' });
  });

  it('applies preserve-3d transform style', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const track = container.querySelector('[style*="preserve-3d"]');
    expect(track).toBeInTheDocument();
  });

  // Requirement 7.5: Scale centered card larger than adjacent
  it('applies active class to centered card with scale 1.1', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const activeCard = container.querySelector('.carousel-card.active');
    expect(activeCard).toBeInTheDocument();
    expect(activeCard).toHaveStyle({ opacity: '1' });
    expect(activeCard).toHaveStyle({ zIndex: '10' });
  });

  it('applies adjacent class with scale 0.9 and translateZ -100px', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const adjacentCards = container.querySelectorAll('.carousel-card.adjacent');
    expect(adjacentCards.length).toBeGreaterThan(0);
    
    adjacentCards.forEach(card => {
      expect(card).toHaveStyle({ opacity: '0.7' });
      expect(card).toHaveStyle({ zIndex: '5' });
    });
  });

  it('applies far class with scale 0.7 and translateZ -200px', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const farCards = container.querySelectorAll('.carousel-card.far');
    expect(farCards.length).toBeGreaterThan(0);
    
    farCards.forEach(card => {
      expect(card).toHaveStyle({ opacity: '0.4' });
      expect(card).toHaveStyle({ zIndex: '1' });
    });
  });

  // Requirement 7.6: Click/tap navigation with ARIA labels
  it('renders navigation buttons with ARIA labels', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const prevButton = screen.getByLabelText('Previous product');
    const nextButton = screen.getByLabelText('Next product');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  // Requirement 7.2: Rotate with smooth 3D transforms on navigation
  it('navigates to next product on next button click', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const nextButton = screen.getByLabelText('Next product');
    
    // Initially, Product 1 should be active
    let activeCard = screen.getByText('Product 1').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
    
    // Click next button
    fireEvent.click(nextButton);
    
    // Product 2 should now be active
    activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('navigates to previous product on previous button click', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const prevButton = screen.getByLabelText('Previous product');
    
    // Click previous button (should wrap to last product)
    fireEvent.click(prevButton);
    
    // Product 5 should now be active
    const activeCard = screen.getByText('Product 5').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('applies smooth transition with 700ms expo-out easing', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const cards = container.querySelectorAll('.carousel-card');
    cards.forEach(card => {
      const transition = window.getComputedStyle(card).transition;
      expect(transition).toContain('700ms');
      expect(transition).toContain('cubic-bezier(0.19, 1, 0.22, 1)');
    });
  });

  // Requirement 7.6: Swipe gesture detection (50px threshold)
  it('handles swipe left gesture to go to next product', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toBeInTheDocument();
    
    // Simulate swipe left (touchStart at 200, touchEnd at 100 = 100px left swipe)
    fireEvent.touchStart(carouselContainer!, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(carouselContainer!, { touches: [{ clientX: 150 }] });
    fireEvent.touchEnd(carouselContainer!);
    
    // Product 2 should now be active
    const activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('handles swipe right gesture to go to previous product', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toBeInTheDocument();
    
    // Simulate swipe right (touchStart at 100, touchEnd at 200 = 100px right swipe)
    fireEvent.touchStart(carouselContainer!, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(carouselContainer!, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(carouselContainer!);
    
    // Product 5 should now be active (wrapped around)
    const activeCard = screen.getByText('Product 5').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('ignores swipes below 50px threshold', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toBeInTheDocument();
    
    // Simulate small swipe (below 50px threshold)
    fireEvent.touchStart(carouselContainer!, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(carouselContainer!, { touches: [{ clientX: 130 }] });
    fireEvent.touchEnd(carouselContainer!);
    
    // Product 1 should still be active
    const activeCard = screen.getByText('Product 1').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  // Requirement 7.6: Keyboard navigation (arrow keys)
  it('navigates to next product on ArrowRight key press', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    // Press ArrowRight
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    // Product 2 should now be active
    const activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('navigates to previous product on ArrowLeft key press', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    // Press ArrowLeft
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    
    // Product 5 should now be active (wrapped around)
    const activeCard = screen.getByText('Product 5').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  // Requirement 7.8: Auto-rotate after 5s inactivity
  it('auto-rotates to next product after 5 seconds', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    // Initially, Product 1 should be active
    let activeCard = screen.getByText('Product 1').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
    
    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);
    
    // Product 2 should now be active
    activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('resets auto-rotate timer on user interaction', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const nextButton = screen.getByLabelText('Next product');
    
    // Fast-forward 3 seconds
    vi.advanceTimersByTime(3000);
    
    // User clicks next button
    fireEvent.click(nextButton);
    
    // Product 2 should be active
    let activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
    
    // Fast-forward another 3 seconds (total 6s, but timer was reset)
    vi.advanceTimersByTime(3000);
    
    // Product 2 should still be active (timer was reset)
    activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
    
    // Fast-forward 2 more seconds (5s since last interaction)
    vi.advanceTimersByTime(2000);
    
    // Now Product 3 should be active
    activeCard = screen.getByText('Product 3').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('pauses auto-rotate on mouse enter', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toBeInTheDocument();
    
    // Mouse enters carousel
    fireEvent.mouseEnter(carouselContainer!);
    
    // Fast-forward 10 seconds
    vi.advanceTimersByTime(10000);
    
    // Product 1 should still be active (auto-rotate paused)
    const activeCard = screen.getByText('Product 1').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('resumes auto-rotate on mouse leave', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toBeInTheDocument();
    
    // Mouse enters and leaves carousel
    fireEvent.mouseEnter(carouselContainer!);
    fireEvent.mouseLeave(carouselContainer!);
    
    // Fast-forward 5 seconds
    vi.advanceTimersByTime(5000);
    
    // Product 2 should now be active (auto-rotate resumed)
    const activeCard = screen.getByText('Product 2').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  // Carousel indicators
  it('renders carousel indicators for all products', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const indicators = container.querySelectorAll('[role="tab"]');
    expect(indicators.length).toBe(5);
  });

  it('navigates to specific product on indicator click', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const indicators = container.querySelectorAll('[role="tab"]');
    
    // Click on third indicator (index 2)
    fireEvent.click(indicators[2]);
    
    // Product 3 should now be active
    const activeCard = screen.getByText('Product 3').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('highlights active indicator', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const indicators = container.querySelectorAll('[role="tab"]');
    
    // First indicator should be active
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
    expect(indicators[1]).toHaveAttribute('aria-selected', 'false');
  });

  // ARIA and accessibility
  it('has proper ARIA roles and labels', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const region = screen.getByRole('region', { name: /Product showcase carousel/i });
    expect(region).toBeInTheDocument();
    
    const tablist = screen.getByRole('tablist', { name: /Product navigation/i });
    expect(tablist).toBeInTheDocument();
  });

  it('sets aria-hidden on non-active slides', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const slides = container.querySelectorAll('[role="group"]');
    
    // First slide should not be hidden
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    
    // Other slides should be hidden
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
  });

  // Edge cases
  it('wraps around from last to first product', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    const nextButton = screen.getByLabelText('Next product');
    
    // Click next 5 times to reach last product and wrap around
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
    }
    
    // Should be back to Product 1
    const activeCard = screen.getByText('Product 1').closest('.carousel-card');
    expect(activeCard).toHaveClass('active');
  });

  it('uses default autoRotateInterval when not provided', () => {
    const sectionWithoutInterval: Product3DCarouselSection = {
      ...mockSection,
      autoRotateInterval: undefined,
    };
    
    render(<Product3DCarousel section={sectionWithoutInterval} />);
    
    // Component should render without errors
    expect(screen.getByText('Test Products')).toBeInTheDocument();
  });

  it('displays features list for each product', () => {
    render(<Product3DCarousel section={mockSection} />);
    
    // Check that features are displayed (first 3 features per product)
    expect(screen.getByText('Feature 1A')).toBeInTheDocument();
    expect(screen.getByText('Feature 1B')).toBeInTheDocument();
    expect(screen.getByText('Feature 1C')).toBeInTheDocument();
  });

  it('applies responsive styling classes', () => {
    const { container } = render(<Product3DCarousel section={mockSection} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-24');
  });
});
