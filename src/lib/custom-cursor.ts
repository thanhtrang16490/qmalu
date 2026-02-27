/**
 * Custom Cursor Effects
 * 
 * Implements a custom cursor that follows the mouse pointer with smooth tracking,
 * scales on hover over interactive elements, and provides visual feedback.
 * 
 * Features:
 * - Smooth position tracking with lerp (0.1 interpolation)
 * - Different states for links, buttons, and draggable elements
 * - Hardware-accelerated with transform3d
 * - Fades out after 3s of inactivity
 * - Hidden on touch devices
 * 
 * Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8
 */

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
  opacity: number;
  isActive: boolean;
}

let cursorElement: HTMLDivElement | null = null;
let animationFrameId: number | null = null;
let inactivityTimeout: number | null = null;

const state: CursorState = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  scale: 1,
  opacity: 1,
  isActive: false,
};

/**
 * Linear interpolation for smooth cursor movement
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Update cursor position and appearance
 */
function updateCursor() {
  if (!cursorElement) return;

  // Smooth follow with lerp (0.1 interpolation)
  state.x = lerp(state.x, state.targetX, 0.1);
  state.y = lerp(state.y, state.targetY, 0.1);

  // Apply transform3d for hardware acceleration
  cursorElement.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
  cursorElement.style.opacity = state.opacity.toString();

  animationFrameId = requestAnimationFrame(updateCursor);
}

/**
 * Handle mouse move events
 */
function handleMouseMove(e: MouseEvent) {
  state.targetX = e.clientX;
  state.targetY = e.clientY;
  state.isActive = true;

  // Reset inactivity timeout
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
  }

  // Fade in if hidden
  if (state.opacity < 1) {
    state.opacity = 1;
  }

  // Fade out after 3s inactivity
  inactivityTimeout = window.setTimeout(() => {
    state.opacity = 0;
    state.isActive = false;
  }, 3000);
}

/**
 * Handle mouse enter on interactive elements
 */
function handleMouseEnter(e: Event) {
  const target = e.target as HTMLElement;
  
  // Different states for different element types
  if (target.tagName === 'A' || target.closest('a')) {
    // Link hover state - scale up
    state.scale = 2;
    cursorElement?.classList.add('cursor-link');
  } else if (target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button') {
    // Button hover state - scale up with different style
    state.scale = 1.8;
    cursorElement?.classList.add('cursor-button');
  } else if (target.draggable || target.classList.contains('draggable') || target.getAttribute('data-draggable')) {
    // Draggable element hover state - grab cursor indication
    state.scale = 1.5;
    cursorElement?.classList.add('cursor-draggable');
  } else {
    // Generic interactive element
    state.scale = 1.5;
    cursorElement?.classList.add('cursor-hover');
  }
}

/**
 * Handle mouse leave from interactive elements
 */
function handleMouseLeave() {
  // Return to default state
  state.scale = 1;
  cursorElement?.classList.remove('cursor-link', 'cursor-button', 'cursor-draggable', 'cursor-hover');
}

/**
 * Create cursor element and inject styles
 */
function createCursorElement() {
  // Create cursor element
  cursorElement = document.createElement('div');
  cursorElement.className = 'custom-cursor';
  cursorElement.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorElement);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #175ead;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
      transition: opacity 0.3s ease-out;
      will-change: transform, opacity;
      top: -10px;
      left: -10px;
    }

    .custom-cursor.cursor-link {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }

    .custom-cursor.cursor-button {
      border-color: #175ead;
      background: rgba(23, 94, 173, 0.1);
    }

    .custom-cursor.cursor-draggable {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
      border-style: dashed;
    }

    .custom-cursor.cursor-hover {
      border-color: #8b5cf6;
      background: rgba(139, 92, 246, 0.1);
    }

    /* Hide default cursor when custom cursor is active */
    body.custom-cursor-active,
    body.custom-cursor-active * {
      cursor: none !important;
    }

    body.custom-cursor-active a,
    body.custom-cursor-active button,
    body.custom-cursor-active [role="button"],
    body.custom-cursor-active input,
    body.custom-cursor-active textarea,
    body.custom-cursor-active select,
    body.custom-cursor-active [draggable="true"],
    body.custom-cursor-active .draggable,
    body.custom-cursor-active label,
    body.custom-cursor-active [onclick],
    body.custom-cursor-active [tabindex],
    body.custom-cursor-active .form-checkbox,
    body.custom-cursor-active .form-radio,
    body.custom-cursor-active .form-toggle,
    body.custom-cursor-active .form-file,
    body.custom-cursor-active .form-range-thumb {
      cursor: none !important;
    }

    /* Ensure cursor is visible above all content */
    .custom-cursor {
      pointer-events: none !important;
    }

    /* Hide on touch devices */
    @media (hover: none) {
      .custom-cursor {
        display: none;
      }
    }

    /* Respect reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      .custom-cursor {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Attach event listeners to interactive elements
 */
function attachEventListeners() {
  // Track mouse movement
  document.addEventListener('mousemove', handleMouseMove, { passive: true });

  // Find all interactive elements
  const interactiveSelectors = [
    'a',
    'button',
    '[role="button"]',
    'input',
    'textarea',
    'select',
    '[draggable="true"]',
    '.draggable',
    '[data-draggable]',
    'label',
    '[onclick]',
    '.form-checkbox',
    '.form-radio',
    '.form-toggle',
    '.form-file',
    '.form-range-thumb',
  ];

  const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));

  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });

  // Add class to body to hide default cursor
  document.body.classList.add('custom-cursor-active');
}

/**
 * Initialize custom cursor
 */
export function initCustomCursor() {
  // Check if device supports hover (not a touch device)
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  
  if (!supportsHover) {
    return; // Don't initialize on touch devices
  }

  // Create cursor element
  createCursorElement();

  // Attach event listeners
  attachEventListeners();

  // Start animation loop
  updateCursor();

  // Set up MutationObserver to watch for dynamic content
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      // Debounce updates
      setTimeout(() => {
        updateCustomCursorElements();
      }, 100);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Store observer for cleanup
  (window as any).__cursorObserver = observer;
}

/**
 * Cleanup and remove custom cursor
 */
export function destroyCustomCursor() {
  // Stop animation loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  // Clear inactivity timeout
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = null;
  }

  // Disconnect observer
  const observer = (window as any).__cursorObserver;
  if (observer) {
    observer.disconnect();
    delete (window as any).__cursorObserver;
  }

  // Remove cursor element
  if (cursorElement) {
    cursorElement.remove();
    cursorElement = null;
  }

  // Remove event listeners
  document.removeEventListener('mousemove', handleMouseMove);

  // Remove body class
  document.body.classList.remove('custom-cursor-active');
}

/**
 * Update interactive elements (call after dynamic content is added)
 */
export function updateCustomCursorElements() {
  // Re-attach event listeners to new elements
  const interactiveSelectors = [
    'a',
    'button',
    '[role="button"]',
    'input',
    'textarea',
    'select',
    '[draggable="true"]',
    '.draggable',
    '[data-draggable]',
    'label',
    '[onclick]',
    '.form-checkbox',
    '.form-radio',
    '.form-toggle',
    '.form-file',
    '.form-range-thumb',
  ];

  const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));

  interactiveElements.forEach((element) => {
    // Remove existing listeners to avoid duplicates
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    
    // Add listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
}
