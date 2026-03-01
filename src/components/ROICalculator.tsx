import { useState } from 'react'

interface CalculatorResult {
  currentCost: number
  newCost: number
  savings: number
  savingsPercent: number
  roi: number
}

export default function ROICalculator() {
  const [animalType, setAnimalType] = useState('pig')
  const [quantity, setQuantity] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const animalTypes = {
    pig: { name: 'Heo', avgConsumption: 2.5, improvement: 0.25, icon: '🐷' },
    poultry: { name: 'Gia cầm', avgConsumption: 0.12, improvement: 0.20, icon: '🐔' },
    fish: { name: 'Thủy sản', avgConsumption: 1.5, improvement: 0.30, icon: '🐟' }
  }

  const calculateROI = () => {
    const qty = parseInt(quantity)
    const price = parseInt(currentPrice)
    
    if (!qty || !price) return

    const animal = animalTypes[animalType as keyof typeof animalTypes]
    const monthlyConsumption = qty * animal.avgConsumption * 30
    const currentMonthlyCost = monthlyConsumption * price
    const improvedCost = currentMonthlyCost * (1 - animal.improvement)
    const monthlySavings = currentMonthlyCost - improvedCost
    const yearlySavings = monthlySavings * 12
    const savingsPercent = animal.improvement * 100

    setResult({
      currentCost: currentMonthlyCost,
      newCost: improvedCost,
      savings: monthlySavings,
      savingsPercent: savingsPercent,
      roi: (yearlySavings / currentMonthlyCost) * 100
    })
    setShowResult(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Tính Toán Lợi Nhuận
        </h3>
        <p className="text-gray-600">
          Xem bạn có thể tiết kiệm bao nhiêu với APPE
        </p>
      </div>

      <div className="space-y-6">
        {/* Animal Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Loại vật nuôi
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(animalTypes).map(([key, animal]) => (
              <button
                key={key}
                onClick={() => setAnimalType(key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  animalType === key
                    ? 'border-primary bg-red-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{animal.icon}</div>
                <div className="text-sm font-medium text-gray-900">
                  {animal.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số lượng vật nuôi
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ví dụ: 500"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Current Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giá thức ăn hiện tại (VNĐ/kg)
          </label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="Ví dụ: 15000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateROI}
          disabled={!quantity || !currentPrice}
          className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
        >
          Tính toán ngay
        </button>

        {/* Results */}
        {showResult && result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💰</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-1">
                Kết quả ước tính
              </h4>
              <p className="text-sm text-gray-600">
                Với {quantity} con {animalTypes[animalType as keyof typeof animalTypes].name.toLowerCase()}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                <span className="text-gray-600">Chi phí hiện tại/tháng:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(result.currentCost)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                <span className="text-gray-600">Chi phí với APPE/tháng:</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(result.newCost)}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
                <span className="font-medium">Tiết kiệm/tháng:</span>
                <span className="text-2xl font-bold">
                  {formatCurrency(result.savings)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                <span className="text-gray-600">Tiết kiệm/năm:</span>
                <span className="font-semibold text-green-600 text-lg">
                  {formatCurrency(result.savings * 12)}
                </span>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Giảm chi phí thức ăn
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {result.savingsPercent.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 space-y-3">
              <a
                href="/lien-he"
                className="block w-full bg-primary hover:bg-primary-dark text-white text-center font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Nhận báo giá chi tiết
              </a>
              <button
                onClick={() => setShowResult(false)}
                className="block w-full text-gray-600 hover:text-gray-900 text-center font-medium py-2 transition-colors"
              >
                Tính toán lại
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              * Kết quả mang tính chất tham khảo, dựa trên số liệu trung bình
            </p>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>1,500+ khách hàng</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tiết kiệm thực tế</span>
          </div>
        </div>
      </div>
    </div>
  )
}
