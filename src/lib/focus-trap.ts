/**
 * Focus Trap Utility
 * 
 * Traps focus within a container element (useful for modals and dialogs)
 * Requirements: 26.2, 26.3
 */

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
];

interface FocusTrapOptions {
  initialFocus?: HTMLElement | null;
  returnFocus?: HTMLElement | null;
  escapeDeactivates?: boolean;
  onDeactivate?: () => void;
}

export class FocusTrap {
  private container: HTMLElement;
  private options: FocusTrapOptions;
  private previouslyFocusedElement: HTMLElement | null = null;
  private isActive = false;

  constructor(container: HTMLElement, options: FocusTrapOptions = {}) {
    this.container = container;
    this.options = {
      escapeDeactivates: true,
      ...options,
    };
  }

  /**
   * Get all focusable elements within the container
   */
  private getFocusableElements(): HTMLElement[] {
    const elements = this.container.querySelectorAll<HTMLElement>(
      FOCUSABLE_ELEMENTS.join(', ')
    );
    return Array.from(elements).filter((el) => {
      return (
        el.offsetWidth > 0 &&
        el.offsetHeight > 0 &&
        !el.hasAttribute('disabled') &&
        !el.hasAttribute('aria-hidden')
      );
    });
  }

  /**
   * Handle Tab key press
   */
  private handleTab = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  /**
   * Handle Escape key press
   */
  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.options.escapeDeactivates) {
      event.preventDefault();
      this.deactivate();
      if (this.options.onDeactivate) {
        this.options.onDeactivate();
      }
    }
  };

  /**
   * Activate the focus trap
   */
  activate() {
    if (this.isActive) return;

    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Add event listeners
    document.addEventListener('keydown', this.handleTab);
    if (this.options.escapeDeactivates) {
      document.addEventListener('keydown', this.handleEscape);
    }

    // Focus initial element
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      const initialFocus = this.options.initialFocus || focusableElements[0];
      // Use setTimeout to ensure the element is ready to receive focus
      setTimeout(() => {
        initialFocus.focus();
      }, 0);
    }

    this.isActive = true;
  }

  /**
   * Deactivate the focus trap
   */
  deactivate() {
    if (!this.isActive) return;

    // Remove event listeners
    document.removeEventListener('keydown', this.handleTab);
    document.removeEventListener('keydown', this.handleEscape);

    // Return focus to previously focused element
    const returnFocus = this.options.returnFocus || this.previouslyFocusedElement;
    if (returnFocus) {
      setTimeout(() => {
        returnFocus.focus();
      }, 0);
    }

    this.isActive = false;
  }

  /**
   * Update the container element
   */
  updateContainer(container: HTMLElement) {
    this.container = container;
  }
}

/**
 * React hook for focus trap
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean,
  options: FocusTrapOptions = {}
) {
  const focusTrapRef = React.useRef<FocusTrap | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Create focus trap instance
    if (!focusTrapRef.current) {
      focusTrapRef.current = new FocusTrap(containerRef.current, options);
    }

    // Activate or deactivate based on isActive prop
    if (isActive) {
      focusTrapRef.current.activate();
    } else {
      focusTrapRef.current.deactivate();
    }

    // Cleanup on unmount
    return () => {
      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
      }
    };
  }, [containerRef, isActive, options]);

  return focusTrapRef.current;
}

/**
 * Simple function to create and manage a focus trap
 */
export function createFocusTrap(
  container: HTMLElement,
  options: FocusTrapOptions = {}
): FocusTrap {
  return new FocusTrap(container, options);
}
