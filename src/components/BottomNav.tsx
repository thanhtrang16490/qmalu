/**
 * Bottom Navigation Component
 * 
 * Mobile-only bottom navigation bar for quick access to key pages
 */

interface BottomNavProps {
  currentPath?: string;
  onQuoteClick?: () => void;
  onContactClick?: () => void;
}

export default function BottomNav({ currentPath = '/', onQuoteClick, onContactClick }: BottomNavProps) {
  // Detect language from path
  const isEnglish = currentPath.startsWith('/en');
  const isChinese = currentPath.startsWith('/cn');
  
  // Get localized paths
  const homePath = isEnglish ? '/en' : isChinese ? '/cn' : '/';
  const productsPath = isEnglish ? '/en/products' : isChinese ? '/cn/products' : '/san-pham';
  const contactPath = isEnglish ? '/en/contact' : isChinese ? '/cn/contact' : '/lien-he';
  
  // Get localized labels
  const labels = {
    home: isEnglish ? 'Home' : isChinese ? '首页' : 'Trang chủ',
    products: isEnglish ? 'Products' : isChinese ? '产品' : 'Sản phẩm',
    contact: isEnglish ? 'Contact' : isChinese ? '联系' : 'Liên hệ',
    quote: isEnglish ? 'Quote' : isChinese ? '报价' : 'Báo giá'
  };
  
  const isActive = (path: string) => {
    // Exact match for home
    if (path === homePath) {
      return currentPath === path;
    }
    // Starts with for other pages
    return currentPath.startsWith(path);
  };
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-16">
        {/* Home */}
        <a
          href={homePath}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive(homePath) ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label={labels.home}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">{labels.home}</span>
        </a>
        
        {/* Products */}
        <a
          href={productsPath}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive(productsPath) ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label={labels.products}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-xs font-medium">{labels.products}</span>
        </a>
        
        {/* Contact */}
        <button
          id="mobile-contact-button"
          onClick={onContactClick}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive(contactPath) ? 'text-primary' : 'text-gray-600'
          }`}
          aria-label={labels.contact}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs font-medium">{labels.contact}</span>
        </button>
        
        {/* Quote */}
        <button
          id="mobile-quote-button"
          onClick={onQuoteClick}
          className="flex flex-col items-center justify-center gap-1 text-primary transition-colors active:scale-95"
          aria-label={labels.quote}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium">{labels.quote}</span>
        </button>
      </div>
    </nav>
  );
}
