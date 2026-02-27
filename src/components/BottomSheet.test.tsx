import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BottomSheet from './BottomSheet';

describe('BottomSheet', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    document.body.style.overflow = '';
  });

  it('renders bottom sheet when open on mobile', () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <BottomSheet isOpen={false} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render on desktop (>= 768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays drag handle', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const handle = container.querySelector('.w-10.h-1.bg-gray-300');
    expect(handle).toBeInTheDocument();
  });

  it('displays backdrop overlay', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const backdrop = container.querySelector('.fixed.inset-0.bg-black\\/50');
    expect(backdrop).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <BottomSheet isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const backdrop = container.querySelector('.fixed.inset-0.bg-black\\/50');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('prevents body scroll when open', () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <BottomSheet isOpen={false} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('supports default snap points [0.5, 1]', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const sheet = container.querySelector('[role="dialog"]') as HTMLElement;
    expect(sheet?.style.height).toBe('50vh'); // First snap point (0.5)
  });

  it('supports custom snap points', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={() => {}} snapPoints={[0.3, 0.7, 1]}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const sheet = container.querySelector('[role="dialog"]') as HTMLElement;
    expect(sheet?.style.height).toBe('30vh'); // First snap point (0.3)
  });

  it('has spring animation configuration', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const sheet = container.querySelector('[role="dialog"]') as HTMLElement;
    expect(sheet?.style.animation).toContain('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
  });

  it('applies correct ARIA attributes', () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('handles touch drag gestures', () => {
    const onClose = vi.fn();
    const { container } = render(
      <BottomSheet isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const sheet = container.querySelector('[role="dialog"]') as HTMLElement;

    // Simulate swipe down gesture (> 100px threshold)
    fireEvent.touchStart(sheet, {
      touches: [{ clientY: 100 }],
    });

    fireEvent.touchMove(sheet, {
      touches: [{ clientY: 250 }], // 150px down
    });

    fireEvent.touchEnd(sheet);

    expect(onClose).toHaveBeenCalled();
  });
});
