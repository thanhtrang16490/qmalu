import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useSwipeGesture } from './useSwipeGesture';

// Test component that uses the hook
function SwipeableComponent({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold }: any) {
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold
  });

  return (
    <div 
      data-testid="swipeable" 
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
    >
      Swipeable Content
    </div>
  );
}

describe('useSwipeGesture', () => {
  it('detects swipe left gesture', () => {
    const onSwipeLeft = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeLeft={onSwipeLeft} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate swipe left (start at 200, end at 100)
    fireEvent.touchStart(element, {
      touches: [{ clientX: 200, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 100, clientY: 100 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
  });

  it('detects swipe right gesture', () => {
    const onSwipeRight = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeRight={onSwipeRight} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate swipe right (start at 100, end at 200)
    fireEvent.touchStart(element, {
      touches: [{ clientX: 100, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 200, clientY: 100 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  it('detects swipe up gesture', () => {
    const onSwipeUp = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeUp={onSwipeUp} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate swipe up (start at 200, end at 100)
    fireEvent.touchStart(element, {
      touches: [{ clientX: 100, clientY: 200 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 100, clientY: 100 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeUp).toHaveBeenCalledTimes(1);
  });

  it('detects swipe down gesture', () => {
    const onSwipeDown = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeDown={onSwipeDown} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate swipe down (start at 100, end at 200)
    fireEvent.touchStart(element, {
      touches: [{ clientX: 100, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 100, clientY: 200 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeDown).toHaveBeenCalledTimes(1);
  });

  it('does not trigger swipe if distance is below threshold', () => {
    const onSwipeLeft = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeLeft={onSwipeLeft} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate small swipe (only 30px, below 50px threshold)
    fireEvent.touchStart(element, {
      touches: [{ clientX: 150, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 120, clientY: 100 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  it('uses default threshold of 50px when not specified', () => {
    const onSwipeLeft = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeLeft={onSwipeLeft} />
    );

    const element = getByTestId('swipeable');

    // Simulate swipe with exactly 50px distance
    fireEvent.touchStart(element, {
      touches: [{ clientX: 150, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 99, clientY: 100 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
  });

  it('prioritizes horizontal swipe over vertical when deltaX > deltaY', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeDown = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeLeft={onSwipeLeft} onSwipeDown={onSwipeDown} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate diagonal swipe with more horizontal movement
    fireEvent.touchStart(element, {
      touches: [{ clientX: 200, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 100, clientY: 130 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    expect(onSwipeDown).not.toHaveBeenCalled();
  });

  it('prioritizes vertical swipe over horizontal when deltaY > deltaX', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeDown = vi.fn();
    const { getByTestId } = render(
      <SwipeableComponent onSwipeLeft={onSwipeLeft} onSwipeDown={onSwipeDown} threshold={50} />
    );

    const element = getByTestId('swipeable');

    // Simulate diagonal swipe with more vertical movement
    fireEvent.touchStart(element, {
      touches: [{ clientX: 100, clientY: 100 }]
    });

    fireEvent.touchMove(element, {
      touches: [{ clientX: 130, clientY: 200 }]
    });

    fireEvent.touchEnd(element);

    expect(onSwipeDown).toHaveBeenCalledTimes(1);
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });
});
