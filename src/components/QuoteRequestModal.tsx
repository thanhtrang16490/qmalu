import { useState, useEffect } from 'react'

interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productCode?: string
  lang?: 'vi' | 'en' | 'cn'
}

export default function QuoteRequestModal({ 
  isOpen, 
  onClose, 
  productName, 
  productCode,
  lang = 'vi' 
}: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    quantity: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Translations
  const t = {
    vi: {
      title: 'Nhận báo giá',
      subtitle: 'Vui lòng điền thông tin để nhận báo giá chi tiết',
      product: 'Sản phẩm',
      name: 'Họ và tên',
      namePlaceholder: 'Nguyễn Văn A',
      phone: 'Số điện thoại',
      phonePlaceholder: '0912 345 678',
      email: 'Email',
      emailPlaceholder: 'email@example.com',
      company: 'Công ty',
      companyPlaceholder: 'Tên công ty (không bắt buộc)',
      quantity: 'Số lượng dự kiến',
      quantityPlaceholder: 'VD: 100 thanh, 500 bộ',
      message: 'Ghi chú',
      messagePlaceholder: 'Yêu cầu đặc biệt hoặc câu hỏi...',
      submit: 'Gửi yêu cầu báo giá',
      submitting: 'Đang gửi...',
      cancel: 'Hủy',
      successTitle: 'Gửi thành công!',
      successMessage: 'Chúng tôi đã nhận được yêu cầu báo giá của bạn. Nhân viên sẽ liên hệ trong vòng 24h.',
      errorTitle: 'Có lỗi xảy ra',
      errorMessage: 'Vui lòng thử lại hoặc liên hệ hotline: 0947 776 662',
      close: 'Đóng',
      required: 'Bắt buộc'
    },
    en: {
      title: 'Request Quote',
      subtitle: 'Please fill in the information to receive a detailed quote',
      product: 'Product',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      phone: 'Phone Number',
      phonePlaceholder: '+84 912 345 678',
      email: 'Email',
      emailPlaceholder: 'email@example.com',
      company: 'Company',
      companyPlaceholder: 'Company name (optional)',
      quantity: 'Expected Quantity',
      quantityPlaceholder: 'E.g: 100 pieces, 500 sets',
      message: 'Notes',
      messagePlaceholder: 'Special requirements or questions...',
      submit: 'Send Quote Request',
      submitting: 'Sending...',
      cancel: 'Cancel',
      successTitle: 'Sent Successfully!',
      successMessage: 'We have received your quote request. Our team will contact you within 24 hours.',
      errorTitle: 'An Error Occurred',
      errorMessage: 'Please try again or contact hotline: 0947 776 662',
      close: 'Close',
      required: 'Required'
    },
    cn: {
      title: '获取报价',
      subtitle: '请填写信息以获取详细报价',
      product: '产品',
      name: '姓名',
      namePlaceholder: '张三',
      phone: '电话号码',
      phonePlaceholder: '+84 912 345 678',
      email: '电子邮件',
      emailPlaceholder: 'email@example.com',
      company: '公司',
      companyPlaceholder: '公司名称（可选）',
      quantity: '预计数量',
      quantityPlaceholder: '例如：100根，500套',
      message: '备注',
      messagePlaceholder: '特殊要求或问题...',
      submit: '发送报价请求',
      submitting: '发送中...',
      cancel: '取消',
      successTitle: '发送成功！',
      successMessage: '我们已收到您的报价请求。我们的团队将在24小时内与您联系。',
      errorTitle: '发生错误',
      errorMessage: '请重试或联系热线：0947 776 662',
      close: '关闭',
      required: '必填'
    }
  }

  const text = t[lang]

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would send the data to your backend
      console.log('Quote request:', {
        ...formData,
        productName,
        productCode
      })
      
      setSubmitStatus('success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: '',
          quantity: '',
          message: ''
        })
        setSubmitStatus('idle')
        onClose()
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {submitStatus === 'idle' ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{text.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{text.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Info */}
              <div className="bg-red-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs font-medium text-blue-900 mb-1">{text.product}</div>
                <div className="text-sm font-semibold text-blue-900">{productName}</div>
                {productCode && (
                  <div className="text-xs text-blue-700 mt-1">Mã: {productCode}</div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={text.namePlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={text.phonePlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={text.emailPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.company}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={text.companyPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.quantity}
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={text.quantityPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {text.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={text.messagePlaceholder}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  {text.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? text.submitting : text.submit}
                </button>
              </div>
            </form>
          </>
        ) : submitStatus === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{text.successTitle}</h3>
            <p className="text-sm text-gray-600">{text.successMessage}</p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{text.errorTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">{text.errorMessage}</p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
            >
              {text.close}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
