/**
 * Bottom Navigation Component
 * 
 * Mobile-only bottom navigation bar for quick access to key pages
 */

interface BottomNavProps {
  currentPath?: string;
  onQuoteClick?: () => void;
}

export default function BottomNav({ currentPath = '/', onQuoteClick }: BottomNavProps) {
  const isActive = (path: string) => currentPath === path;
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-16">
        {/* Home */}
        <a
          href="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label="Trang chủ"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Trang chủ</span>
        </a>
        
        {/* Products */}
        <a
          href="/san-pham"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/san-pham') ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label="Sản phẩm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-xs font-medium">Sản phẩm</span>
        </a>
        
        {/* Contact */}
        <a
          href="/lien-he"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/lien-he') ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label="Liên hệ"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs font-medium">Liên hệ</span>
        </a>
        
        {/* Quote */}
        <button
          onClick={onQuoteClick}
          className="flex flex-col items-center justify-center gap-1 text-primary transition-colors"
          aria-label="Yêu cầu báo giá"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium">Báo giá</span>
        </button>
      </div>
    </nav>
  );
}
