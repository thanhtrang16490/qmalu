/**
 * Sticky Header with Blur Effect
 * 
 * Implements a sticky header that:
 * - Fixes to top after 100px scroll
 * - Applies backdrop blur and semi-transparent background when sticky
 * - Hides on scroll down, shows on scroll up
 * - Returns to default state when scroll position is 0
 * - Smooth transitions (300ms)
 * - Shadow elevation when sticky
 * 
 * Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8
 */

interface StickyHeaderOptions {
  threshold?: number; // Scroll threshold to activate sticky (default: 100px)
  transitionDuration?: number; // Transition duration in ms (default: 300)
}

export function initStickyHeader(
  headerSelector: string = 'header',
  options: StickyHeaderOptions = {}
): () => void {
  const { threshold = 100, transitionDuration = 300 } = options;
  
  const header = document.querySelector<HTMLElement>(headerSelector);
  if (!header) {
    console.warn(`Sticky header: Element "${headerSelector}" not found`);
    return () => {};
  }

  let lastScroll = 0;
  let isSticky = false;
  let ticking = false;

  // Apply initial styles
  header.style.position = 'fixed';
  header.style.top = '0';
  header.style.left = '0';
  header.style.right = '0';
  header.style.zIndex = '100';
  header.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), background ${transitionDuration}ms ease, box-shadow ${transitionDuration}ms ease`;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    // Add sticky class after threshold
    if (currentScroll > threshold && !isSticky) {
      header.classList.add('sticky');
      header.style.background = 'rgba(255, 255, 255, 0.8)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.webkitBackdropFilter = 'blur(12px)';
      header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      isSticky = true;
    } else if (currentScroll <= threshold && isSticky) {
      header.classList.remove('sticky');
      header.style.background = '';
      header.style.backdropFilter = '';
      header.style.webkitBackdropFilter = '';
      header.style.boxShadow = '';
      header.style.transform = '';
      isSticky = false;
    }

    // Hide on scroll down, show on scroll up (only when sticky)
    if (isSticky) {
      if (currentScroll > lastScroll && currentScroll > threshold) {
        // Scrolling down - hide header
        header.classList.add('hidden');
        header.style.transform = 'translateY(-100%)';
      } else if (currentScroll < lastScroll) {
        // Scrolling up - show header
        header.classList.remove('hidden');
        header.style.transform = 'translateY(0)';
      }
    }

    lastScroll = currentScroll;
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  };

  const onScroll = () => {
    requestTick();
  };

  // Add scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial check
  handleScroll();

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
    header.classList.remove('sticky', 'hidden');
    header.style.position = '';
    header.style.top = '';
    header.style.left = '';
    header.style.right = '';
    header.style.zIndex = '';
    header.style.transition = '';
    header.style.background = '';
    header.style.backdropFilter = '';
    header.style.webkitBackdropFilter = '';
    header.style.boxShadow = '';
    header.style.transform = '';
  };
}

/**
 * React hook for sticky header
 */
export function useStickyHeader(
  headerRef: React.RefObject<HTMLElement>,
  options: StickyHeaderOptions = {}
): void {
  const { threshold = 100, transitionDuration = 300 } = options;

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScroll = 0;
    let isSticky = false;
    let ticking = false;

    // Apply initial styles
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.right = '0';
    header.style.zIndex = '100';
    header.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), background ${transitionDuration}ms ease, box-shadow ${transitionDuration}ms ease`;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Add sticky class after threshold
      if (currentScroll > threshold && !isSticky) {
        header.classList.add('sticky');
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.webkitBackdropFilter = 'blur(12px)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        isSticky = true;
      } else if (currentScroll <= threshold && isSticky) {
        header.classList.remove('sticky');
        header.style.background = '';
        header.style.backdropFilter = '';
        header.style.webkitBackdropFilter = '';
        header.style.boxShadow = '';
        header.style.transform = '';
        isSticky = false;
      }

      // Hide on scroll down, show on scroll up (only when sticky)
      if (isSticky) {
        if (currentScroll > lastScroll && currentScroll > threshold) {
          // Scrolling down - hide header
          header.classList.add('hidden');
          header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll) {
          // Scrolling up - show header
          header.classList.remove('hidden');
          header.style.transform = 'translateY(0)';
        }
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    const onScroll = () => {
      requestTick();
    };

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      header.classList.remove('sticky', 'hidden');
      header.style.position = '';
      header.style.top = '';
      header.style.left = '';
      header.style.right = '';
      header.style.zIndex = '';
      header.style.transition = '';
      header.style.background = '';
      header.style.backdropFilter = '';
      header.style.webkitBackdropFilter = '';
      header.style.boxShadow = '';
      header.style.transform = '';
    };
  }, [headerRef, threshold, transitionDuration]);
}
