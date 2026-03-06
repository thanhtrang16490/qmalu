/**
 * Quick Contact Modal Component
 * 
 * Mobile-optimized modal for quick contact actions
 */

interface QuickContactModalProps {
  lang?: 'vi' | 'en' | 'cn';
}

export default function QuickContactModal({ lang = 'vi' }: QuickContactModalProps) {
  const translations = {
    vi: {
      title: 'Liên hệ nhanh',
      subtitle: 'Chọn phương thức liên hệ',
      phone: 'Gọi điện thoại',
      phoneNumber: '0947 776 662',
      zalo: 'Nhắn tin Zalo',
      messenger: 'Nhắn tin Messenger',
      email: 'Gửi Email',
      close: 'Đóng'
    },
    en: {
      title: 'Quick Contact',
      subtitle: 'Choose contact method',
      phone: 'Call Phone',
      phoneNumber: '0947 776 662',
      zalo: 'Message Zalo',
      messenger: 'Message Messenger',
      email: 'Send Email',
      close: 'Close'
    },
    cn: {
      title: '快速联系',
      subtitle: '选择联系方式',
      phone: '拨打电话',
      phoneNumber: '0947 776 662',
      zalo: 'Zalo消息',
      messenger: 'Messenger消息',
      email: '发送邮件',
      close: '关闭'
    }
  };

  const t = translations[lang];

  const handleClose = () => {
    const modal = document.getElementById('quick-contact-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:0947776662';
  };

  const handleZalo = () => {
    // Zalo link format: https://zalo.me/PHONE_NUMBER
    window.open('https://zalo.me/0947776662', '_blank');
  };

  const handleMessenger = () => {
    // Messenger link - replace with actual Facebook page ID
    window.open('https://m.me/quangminhaluminum', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@qmalu.com';
  };

  return (
    <div 
      id="quick-contact-modal" 
      className="fixed inset-0 z-[100] hidden items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden z-[101] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 pb-2 sm:hidden">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
              <p className="text-sm text-gray-600 mt-0.5">{t.subtitle}</p>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              aria-label={t.close}
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contact Options */}
        <div className="p-6 space-y-3">
          {/* Phone */}
          <button
            onClick={handleCall}
            className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-200 rounded-xl transition-all active:scale-98 touch-manipulation group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{t.phone}</div>
              <div className="text-sm text-green-700 font-medium">{t.phoneNumber}</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Zalo */}
          <button
            onClick={handleZalo}
            className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-2 border-blue-200 rounded-xl transition-all active:scale-98 touch-manipulation group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.97L2.05 21.95l4.014-1.916A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.5 13.5h-9v-1.5h9v1.5zm0-3h-9V11h9v1.5zm0-3h-9V8h9v1.5z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{t.zalo}</div>
              <div className="text-sm text-blue-700 font-medium">{t.phoneNumber}</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Messenger */}
          <button
            onClick={handleMessenger}
            className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 rounded-xl transition-all active:scale-98 touch-manipulation group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.446 5.51 3.707 7.215V22l3.39-1.862c.905.251 1.864.386 2.903.386 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm.993 12.441l-2.556-2.728-4.99 2.728 5.49-5.828 2.617 2.728 4.929-2.728-5.49 5.828z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{t.messenger}</div>
              <div className="text-sm text-purple-700 font-medium">Facebook Messenger</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Email */}
          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 border-2 border-gray-200 rounded-xl transition-all active:scale-98 touch-manipulation group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{t.email}</div>
              <div className="text-sm text-gray-700 font-medium">info@qmalu.com</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Footer - Safe area for mobile */}
        <div className="pb-safe"></div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .active\\:scale-98:active {
          transform: scale(0.98);
        }

        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}
