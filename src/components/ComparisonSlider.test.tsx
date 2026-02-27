import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ComparisonSlider from './ComparisonSlider';

describe('ComparisonSlider', () => {
  const defaultProps = {
    beforeImage: '/images/before.jpg',
    afterImage: '/images/after.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    defaultPosition: 50
  };

  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 1000,
      height: 500,
      top: 0,
      left: 0,
      bottom: 500,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with before and after images', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const images = screen.getAllByRole('img');
    // Container has role="img" plus 2 actual images
    expect(images.length).toBeGreaterThanOrEqual(2);
    
    // Find the actual img elements
    const imgElements = images.filter(el => el.tagName === 'IMG');
    expect(imgElements).toHaveLength(2);
    expect(imgElements[0]).toHaveAttribute('src', '/images/before.jpg');
    expect(imgElements[1]).toHaveAttribute('src', '/images/after.jpg');
  });

  it('renders with default position at 50%', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const handle = container.querySelector('.absolute.top-0.h-full.w-1');
    expect(handle).toHaveStyle({ left: '50%' });
  });

  it('renders with custom default position', () => {
    const { container } = render(
      <ComparisonSlider {...defaultProps} defaultPosition={75} />
    );
    
    const handle = container.querySelector('.absolute.top-0.h-full.w-1');
    expect(handle).toHaveStyle({ left: '75%' });
  });

  it('displays before and after labels', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('uses default labels when not provided', () => {
    render(
      <ComparisonSlider
        beforeImage="/images/before.jpg"
        afterImage="/images/after.jpg"
      />
    );
    
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('handles mouse drag interaction', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const sliderContainer = container.firstChild as HTMLElement;
    
    // Start dragging
    fireEvent.mouseDown(sliderContainer);
    
    // Move mouse to 75% position (750px on 1000px width)
    fireEvent.mouseMove(document, { clientX: 750 });
    
    // Stop dragging
    fireEvent.mouseUp(document);
    
    const handle = container.querySelector('.absolute.top-0.h-full.w-1');
    expect(handle).toHaveStyle({ left: '75%' });
  });

  it('constrains slider position between 0-100%', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const sliderContainer = container.firstChild as HTMLElement;
    
    // Try to drag beyond right edge
    fireEvent.mouseDown(sliderContainer);
    fireEvent.mouseMove(document, { clientX: 1500 }); // Beyond container width
    fireEvent.mouseUp(document);
    
    const handle = container.querySelector('.absolute.top-0.h-full.w-1');
    expect(handle).toHaveStyle({ left: '100%' });
    
    // Try to drag beyond left edge
    fireEvent.mouseDown(sliderContainer);
    fireEvent.mouseMove(document, { clientX: -100 }); // Before container start
    fireEvent.mouseUp(document);
    
    expect(handle).toHaveStyle({ left: '0%' });
  });

  it('handles touch drag interaction', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const sliderContainer = container.firstChild as HTMLElement;
    
    // Start touch
    fireEvent.touchStart(sliderContainer);
    
    // Move touch to 25% position (250px on 1000px width)
    fireEvent.touchMove(document, {
      touches: [{ clientX: 250 }]
    });
    
    // End touch
    fireEvent.touchEnd(document);
    
    const handle = container.querySelector('.absolute.top-0.h-full.w-1');
    expect(handle).toHaveStyle({ left: '25%' });
  });

  it('applies clip-path to after image based on position', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    // Get all divs with the class combination and find the one with clip-path
    const divs = container.querySelectorAll('div.absolute.inset-0.w-full.h-full');
    let afterImageContainer: Element | null = null;
    
    divs.forEach(div => {
      const style = div.getAttribute('style');
      if (style && style.indexOf('clip-path') !== -1) {
        afterImageContainer = div;
      }
    });
    
    expect(afterImageContainer).toBeTruthy();
    const style = afterImageContainer?.getAttribute('style');
    expect(style).toContain('clip-path');
    expect(style).toContain('inset');
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const container = screen.getByRole('img', {
      name: /comparison slider: before and after/i
    });
    expect(container).toBeInTheDocument();
  });

  it('prevents image dragging', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const allElements = screen.getAllByRole('img');
    const images = allElements.filter(el => el.tagName === 'IMG');
    
    images.forEach(img => {
      expect(img).toHaveAttribute('draggable', 'false');
    });
  });

  it('applies cursor style for drag affordance', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const sliderContainer = container.firstChild as HTMLElement;
    expect(sliderContainer).toHaveClass('cursor-ew-resize');
  });

  it('renders handle with visual indicator', () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    
    const handle = container.querySelector('.w-1.bg-white.shadow-lg');
    expect(handle).toBeInTheDocument();
    
    const handleCircle = container.querySelector('.w-12.h-12.bg-white.rounded-full');
    expect(handleCircle).toBeInTheDocument();
  });
});
