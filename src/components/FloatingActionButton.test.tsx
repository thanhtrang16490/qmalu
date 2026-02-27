import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FloatingActionButton from './FloatingActionButton';

describe('FloatingActionButton', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('renders FAB on mobile when scrolled past 300px', () => {
    render(<FloatingActionButton />);

    // Trigger scroll event
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    expect(fab).toBeInTheDocument();
  });

  it('does not render on desktop (>= 768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render when scroll position is below 300px', () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 200,
    });

    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has correct size (56x56px)', () => {
    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    expect(fab.className).toContain('w-14'); // 56px
    expect(fab.className).toContain('h-14'); // 56px
  });

  it('applies elevation shadow', () => {
    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    expect(fab.className).toContain('shadow-lg');
  });

  it('applies gradient background', () => {
    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    expect(fab.className).toContain('bg-gradient-to-br');
    expect(fab.className).toContain('from-primary-600');
    expect(fab.className).toContain('to-green-500');
  });

  it('has entrance animation', () => {
    render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    expect(fab.style.animation).toContain('fabEnter');
    expect(fab.style.animation).toContain('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
  });

  it('calls primaryAction when clicked without actions', () => {
    const primaryAction = vi.fn();
    render(<FloatingActionButton primaryAction={primaryAction} />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    fireEvent.click(fab);

    expect(primaryAction).toHaveBeenCalledTimes(1);
  });

  it('expands menu when clicked with actions', () => {
    const actions = [
      {
        icon: <span>📞</span>,
        label: 'Call',
        onClick: vi.fn()
      },
      {
        icon: <span>✉️</span>,
        label: 'Email',
        onClick: vi.fn()
      }
    ];

    render(<FloatingActionButton actions={actions} />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    fireEvent.click(fab);

    expect(screen.getByText('Call')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('displays action labels in expanded menu', () => {
    const actions = [
      {
        icon: <span>📞</span>,
        label: 'Call Now',
        onClick: vi.fn()
      }
    ];

    render(<FloatingActionButton actions={actions} />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button');
    fireEvent.click(fab);

    expect(screen.getByText('Call Now')).toBeInTheDocument();
  });

  it('calls action onClick when menu item is clicked', () => {
    const action1 = vi.fn();
    const action2 = vi.fn();
    const actions = [
      {
        icon: <span>📞</span>,
        label: 'Call',
        onClick: action1
      },
      {
        icon: <span>✉️</span>,
        label: 'Email',
        onClick: action2
      }
    ];

    render(<FloatingActionButton actions={actions} />);
    fireEvent.scroll(window);

    // Expand menu
    const fab = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(fab);

    // Click first action
    const callButton = screen.getByText('Call').closest('button');
    if (callButton) {
      fireEvent.click(callButton);
    }

    expect(action1).toHaveBeenCalledTimes(1);
    expect(action2).not.toHaveBeenCalled();
  });

  it('closes menu after clicking an action', () => {
    const actions = [
      {
        icon: <span>📞</span>,
        label: 'Call',
        onClick: vi.fn()
      }
    ];

    render(<FloatingActionButton actions={actions} />);
    fireEvent.scroll(window);

    // Expand menu
    const fab = screen.getByRole('button');
    fireEvent.click(fab);

    expect(screen.getByText('Call')).toBeInTheDocument();

    // Click action
    const callButton = screen.getByText('Call').closest('button');
    if (callButton) {
      fireEvent.click(callButton);
    }

    // Menu should be closed
    expect(screen.queryByText('Call')).not.toBeInTheDocument();
  });

  it('toggles between open and close icons', () => {
    const actions = [
      {
        icon: <span>📞</span>,
        label: 'Call',
        onClick: vi.fn()
      }
    ];

    render(<FloatingActionButton actions={actions} />);
    fireEvent.scroll(window);

    const fab = screen.getByRole('button', { name: /open menu/i });
    expect(fab).toHaveAttribute('aria-label', 'Open menu');

    fireEvent.click(fab);

    const closeFab = screen.getByRole('button', { name: /close menu/i });
    expect(closeFab).toHaveAttribute('aria-label', 'Close menu');
  });

  it('is positioned fixed at bottom-right', () => {
    const { container } = render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fabContainer = container.querySelector('.fixed');
    expect(fabContainer?.className).toContain('bottom-6');
    expect(fabContainer?.className).toContain('right-6');
  });

  it('has high z-index for visibility', () => {
    const { container } = render(<FloatingActionButton />);
    fireEvent.scroll(window);

    const fabContainer = container.querySelector('.fixed');
    expect(fabContainer?.className).toContain('z-[999]');
  });
});
