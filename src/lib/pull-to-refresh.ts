/**
 * Pull-to-Refresh Functionality
 * 
 * Native-like pull-to-refresh for mobile web
 */

interface PullToRefreshOptions {
  threshold?: number;
  onRefresh?: () => Promise<void>;
  indicatorColor?: string;
}

export class PullToRefresh {
  private startY = 0;
  private currentY = 0;
  private pulling = false;
  private refreshing = false;
  private threshold: number;
  private onRefresh: () => Promise<void>;
  private indicator: HTMLElement | null = null;
  private indicatorColor: string;

  constructor(options: PullToRefreshOptions = {}) {
    this.threshold = options.threshold || 80;
    this.onRefresh = options.onRefresh || this.defaultRefresh;
    this.indicatorColor = options.indicatorColor || '#e6282b';
    
    this.init();
  }

  private init() {
    // Create refresh indicator
    this.createIndicator();
    
    // Add event listeners
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  private createIndicator() {
    this.indicator = document.createElement('div');
    this.indicator.id = 'pull-to-refresh-indicator';
    this.indicator.innerHTML = `
      <div class="ptr-spinner">
        <svg class="ptr-spinner-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="${this.indicatorColor}" stroke-width="2" fill="none" />
        </svg>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #pull-to-refresh-indicator {
        position: fixed;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: top 0.3s ease, opacity 0.3s ease;
        z-index: 9999;
        opacity: 0;
      }
      
      #pull-to-refresh-indicator.visible {
        opacity: 1;
      }
      
      #pull-to-refresh-indicator.refreshing {
        top: 20px;
      }
      
      .ptr-spinner {
        width: 24px;
        height: 24px;
      }
      
      .ptr-spinner-icon {
        width: 100%;
        height: 100%;
        animation: ptr-spin 1s linear infinite;
      }
      
      @keyframes ptr-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(this.indicator);
  }

  private handleTouchStart(e: TouchEvent) {
    // Only trigger at top of page
    if (window.scrollY === 0 && !this.refreshing) {
      this.startY = e.touches[0].pageY;
      this.pulling = true;
    }
  }

  private handleTouchMove(e: TouchEvent) {
    if (!this.pulling || this.refreshing) return;

    this.currentY = e.touches[0].pageY;
    const diff = this.currentY - this.startY;

    if (diff > 0) {
      // Prevent default scroll
      e.preventDefault();
      
      // Update indicator position
      if (this.indicator) {
        const progress = Math.min(diff / this.threshold, 1);
        const top = -60 + (progress * 80);
        this.indicator.style.top = `${top}px`;
        this.indicator.style.opacity = String(progress);
        
        if (progress >= 1) {
          this.indicator.classList.add('visible');
        }
      }
    }
  }

  private async handleTouchEnd() {
    if (!this.pulling || this.refreshing) return;

    const diff = this.currentY - this.startY;
    this.pulling = false;

    if (diff >= this.threshold) {
      // Trigger refresh
      await this.refresh();
    } else {
      // Reset indicator
      this.resetIndicator();
    }
  }

  private async refresh() {
    if (this.refreshing) return;

    this.refreshing = true;
    
    if (this.indicator) {
      this.indicator.classList.add('refreshing');
    }

    try {
      await this.onRefresh();
      
      // Haptic feedback if available
      this.vibrate([10, 50, 10]);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => {
        this.refreshing = false;
        this.resetIndicator();
      }, 500);
    }
  }

  private resetIndicator() {
    if (this.indicator) {
      this.indicator.style.top = '-60px';
      this.indicator.style.opacity = '0';
      this.indicator.classList.remove('visible', 'refreshing');
    }
  }

  private async defaultRefresh() {
    // Default: reload page
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 500);
    });
  }

  private vibrate(pattern: number | number[]) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  public destroy() {
    document.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    
    if (this.indicator) {
      this.indicator.remove();
    }
  }
}

// Auto-initialize on mobile
export function initPullToRefresh(options?: PullToRefreshOptions) {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return new PullToRefresh(options);
  }
  return null;
}
