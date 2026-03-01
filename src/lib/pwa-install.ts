/**
 * PWA Install Prompt
 * 
 * Handle PWA installation prompt and tracking
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export class PWAInstall {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private installButton: HTMLElement | null = null;
  private isInstalled = false;

  constructor() {
    this.init();
  }

  private init() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      return;
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.showInstallButton();
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallButton();
      console.log('PWA installed successfully');
    });
  }

  private showInstallButton() {
    // Create install button if it doesn't exist
    if (!this.installButton) {
      this.createInstallButton();
    }

    if (this.installButton) {
      this.installButton.style.display = 'flex';
    }
  }

  private hideInstallButton() {
    if (this.installButton) {
      this.installButton.style.display = 'none';
    }
  }

  private createInstallButton() {
    this.installButton = document.createElement('div');
    this.installButton.id = 'pwa-install-prompt';
    this.installButton.innerHTML = `
      <div class="pwa-install-content">
        <div class="pwa-install-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
        <div class="pwa-install-text">
          <div class="pwa-install-title">Cài đặt ứng dụng</div>
          <div class="pwa-install-subtitle">Truy cập nhanh hơn, offline support</div>
        </div>
        <button class="pwa-install-button" id="pwa-install-btn">
          Cài đặt
        </button>
        <button class="pwa-install-close" id="pwa-install-close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #pwa-install-prompt {
        position: fixed;
        bottom: 80px;
        left: 1rem;
        right: 1rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 9998;
        display: none;
        animation: slideUp 0.3s ease-out;
      }
      
      @media (min-width: 768px) {
        #pwa-install-prompt {
          display: none !important;
        }
      }
      
      .pwa-install-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }
      
      .pwa-install-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #e6282b 0%, #4fb348 100%);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }
      
      .pwa-install-text {
        flex: 1;
        min-width: 0;
      }
      
      .pwa-install-title {
        font-weight: 600;
        font-size: 0.875rem;
        color: #111827;
        margin-bottom: 0.125rem;
      }
      
      .pwa-install-subtitle {
        font-size: 0.75rem;
        color: #6b7280;
      }
      
      .pwa-install-button {
        background: #e6282b;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.2s;
      }
      
      .pwa-install-button:hover {
        background: #c71f22;
      }
      
      .pwa-install-button:active {
        transform: scale(0.95);
      }
      
      .pwa-install-close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 0.25rem;
        flex-shrink: 0;
        transition: color 0.2s;
      }
      
      .pwa-install-close:hover {
        color: #6b7280;
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.installButton);

    // Add event listeners
    const installBtn = document.getElementById('pwa-install-btn');
    const closeBtn = document.getElementById('pwa-install-close');

    if (installBtn) {
      installBtn.addEventListener('click', () => this.install());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.dismiss());
    }
  }

  public async install() {
    if (!this.deferredPrompt) return;

    // Show install prompt
    this.deferredPrompt.prompt();

    // Wait for user choice
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted PWA install');
      
      // Track installation
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'accepted'
        });
      }
    } else {
      console.log('User dismissed PWA install');
    }

    // Clear prompt
    this.deferredPrompt = null;
    this.hideInstallButton();
  }

  public dismiss() {
    this.hideInstallButton();
    
    // Track dismissal
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'dismissed'
      });
    }

    // Don't show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  }

  public get installed(): boolean {
    return this.isInstalled;
  }
}

// Auto-initialize
export function initPWAInstall() {
  if (typeof window === 'undefined' || window.innerWidth >= 768) {
    return null;
  }

  // Check if dismissed recently
  const dismissed = localStorage.getItem('pwa-install-dismissed');
  if (dismissed) {
    const dismissedTime = parseInt(dismissed);
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
    
    if (daysSinceDismissed < 7) {
      return null;
    }
  }

  return new PWAInstall();
}
