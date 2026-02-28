import { useState, useEffect } from 'react'
import QuoteRequestModal from './QuoteRequestModal'

interface QuoteRequestModalWrapperProps {
  productName: string
  productCode?: string
  lang?: 'vi' | 'en' | 'cn'
}

export default function QuoteRequestModalWrapper({ 
  productName, 
  productCode,
  lang = 'vi' 
}: QuoteRequestModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openQuoteModal', handleOpen)
    return () => window.removeEventListener('openQuoteModal', handleOpen)
  }, [])

  return (
    <QuoteRequestModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      productName={productName}
      productCode={productCode}
      lang={lang}
    />
  )
}
