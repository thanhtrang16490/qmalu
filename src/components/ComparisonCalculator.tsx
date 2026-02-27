import React, { useState, useEffect, useMemo } from 'react';
import type { ComparisonCalculatorSection } from '../data/homepage-content';

interface ComparisonCalculatorProps {
  section: ComparisonCalculatorSection;
}

interface InputErrors {
  [key: string]: string;
}

interface CalculationBreakdown {
  basePrice: number;
  lengthMultiplier: number;
  quantityMultiplier: number;
  surfaceTreatmentMultiplier: number;
  profileTypeMultiplier: number;
  total: number;
}

export default function ComparisonCalculator({ section }: ComparisonCalculatorProps) {
  const { title, subtitle, inputs = [], options = [] } = section;
  
  // Initialize input values from defaults
  const [inputValues, setInputValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    if (inputs && Array.isArray(inputs)) {
      inputs.forEach(input => {
        initial[input.id] = input.defaultValue;
      });
    }
    return initial;
  });

  const [errors, setErrors] = useState<InputErrors>({});
  const [showBreakdown, setShowBreakdown] = useState<string | null>(null);

  // Validate a single input
  const validateInput = (input: CalculatorInput, value: number | string): string | null => {
    if (input.type === 'number' || input.type === 'range') {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      
      if (isNaN(numValue)) {
        return 'Vui lòng nhập số hợp lệ';
      }
      
      if (input.min !== undefined && numValue < input.min) {
        return `Giá trị tối thiểu là ${input.min}`;
      }
      
      if (input.max !== undefined && numValue > input.max) {
        return `Giá trị tối đa là ${input.max}`;
      }
      
      if (input.step !== undefined) {
        const remainder = (numValue - (input.min || 0)) % input.step;
        if (Math.abs(remainder) > 0.001) {
          return `Giá trị phải là bội số của ${input.step}`;
        }
      }
    }
    
    if (input.type === 'select' && !value) {
      return 'Vui lòng chọn một tùy chọn';
    }
    
    return null;
  };

  // Validate all inputs
  const validateAllInputs = (): boolean => {
    const newErrors: InputErrors = {};
    let isValid = true;

    if (inputs && Array.isArray(inputs)) {
      inputs.forEach(input => {
        const error = validateInput(input, inputValues[input.id]);
        if (error) {
          newErrors[input.id] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleInputChange = (inputId: string, value: number | string) => {
    setInputValues(prev => ({ ...prev, [inputId]: value }));
    
    // Clear error for this input
    if (errors[inputId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[inputId];
        return newErrors;
      });
    }
  };

  // Calculate price for an option
  const calculatePrice = (option: ComparisonOption): CalculationBreakdown => {
    const length = Number(inputValues['length']) || 0;
    const quantity = Number(inputValues['quantity']) || 0;
    const profileType = String(inputValues['profile-type']) || '6063';
    const surfaceTreatment = String(inputValues['surface-treatment']) || 'mill-finish';

    // Base price per kg
    let basePrice = option.basePrice;

    // Profile type multiplier
    const profileMultipliers: Record<string, number> = {
      '6063': 1.0,
      '6061': 1.15,
      '6005': 1.1
    };
    const profileTypeMultiplier = profileMultipliers[profileType] || 1.0;

    // Surface treatment multiplier
    const surfaceMultipliers: Record<string, number> = {
      'mill-finish': 1.0,
      'anodize': 1.2,
      'powder-coating': 1.3,
      'wood-grain': 1.5
    };
    const surfaceTreatmentMultiplier = surfaceMultipliers[surfaceTreatment] || 1.0;

    // Length doesn't affect price per kg, but we show it for context
    const lengthMultiplier = 1.0;

    // Quantity discount (bulk pricing)
    let quantityMultiplier = 1.0;
    if (quantity >= 5000) {
      quantityMultiplier = 0.9; // 10% discount
    } else if (quantity >= 2000) {
      quantityMultiplier = 0.95; // 5% discount
    }

    // Calculate total
    const pricePerKg = basePrice * profileTypeMultiplier * surfaceTreatmentMultiplier * quantityMultiplier;
    const total = pricePerKg * quantity;

    return {
      basePrice,
      lengthMultiplier,
      quantityMultiplier,
      surfaceTreatmentMultiplier,
      profileTypeMultiplier,
      total
    };
  };

  // Calculate results for all options
  const results = useMemo(() => {
    if (!options || !Array.isArray(options)) {
      return [];
    }
    return options.map(option => ({
      option,
      breakdown: calculatePrice(option)
    }));
  }, [inputValues, options]);

  // Check if all inputs are valid
  const allInputsValid = useMemo(() => {
    if (!inputs || !Array.isArray(inputs)) {
      return true;
    }
    return inputs.every(input => {
      const error = validateInput(input, inputValues[input.id]);
      return error === null;
    });
  }, [inputValues, inputs]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format number with separators
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  // Get multiplier label
  const getMultiplierLabel = (multiplier: number): string => {
    if (multiplier === 1.0) return '';
    if (multiplier < 1.0) {
      const discount = Math.round((1 - multiplier) * 100);
      return `(-${discount}%)`;
    }
    const increase = Math.round((multiplier - 1) * 100);
    return `(+${increase}%)`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Input Section - Only show if inputs exist */}
      {inputs && Array.isArray(inputs) && inputs.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputs.map(input => (
            <div key={input.id} className="space-y-2">
              <label htmlFor={input.id} className="block text-sm font-semibold text-gray-700">
                {input.label}
              </label>

              {input.type === 'number' && (
                <input
                  id={input.id}
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={inputValues[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors[input.id]
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
                  } outline-none`}
                  aria-invalid={!!errors[input.id]}
                  aria-describedby={errors[input.id] ? `${input.id}-error` : undefined}
                />
              )}

              {input.type === 'select' && (
                <select
                  id={input.id}
                  value={inputValues[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors[input.id]
                      ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
                  } outline-none bg-white`}
                  aria-invalid={!!errors[input.id]}
                  aria-describedby={errors[input.id] ? `${input.id}-error` : undefined}
                >
                  {input.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {input.type === 'range' && (
                <div className="space-y-2">
                  <input
                    id={input.id}
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={inputValues[input.id]}
                    onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    aria-invalid={!!errors[input.id]}
                    aria-describedby={errors[input.id] ? `${input.id}-error` : undefined}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatNumber(input.min || 0)}</span>
                    <span className="font-semibold text-primary-600">
                      {formatNumber(Number(inputValues[input.id]))}
                    </span>
                    <span>{formatNumber(input.max || 0)}</span>
                  </div>
                </div>
              )}

              {errors[input.id] && (
                <p id={`${input.id}-error`} className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors[input.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      )}
      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map(({ option, breakdown }) => (
          <div
            key={option.id}
            className={`relative bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 ${
              option.recommended
                ? 'ring-4 ring-primary-600 ring-opacity-50 transform scale-105'
                : 'hover:shadow-xl'
            }`}
          >
            {/* Recommended Badge */}
            {option.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-full shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Khuyến nghị
                </span>
              </div>
            )}

            {/* Option Name */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
              {option.name}
            </h3>

            {/* Price Display */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary-600 mb-1">
                {formatCurrency(breakdown.total)}
              </div>
              <div className="text-sm text-gray-600">
                Tổng chi phí cho {formatNumber(Number(inputValues['quantity']))} kg
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {option.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Breakdown Toggle */}
            <button
              onClick={() => setShowBreakdown(showBreakdown === option.id ? null : option.id)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              aria-expanded={showBreakdown === option.id}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  showBreakdown === option.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showBreakdown === option.id ? 'Ẩn chi tiết' : 'Xem chi tiết tính toán'}
            </button>

            {/* Calculation Breakdown */}
            {showBreakdown === option.id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3 animate-fadeIn">
                <h4 className="font-semibold text-gray-900 mb-3">Chi tiết tính toán:</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giá cơ bản (VNĐ/kg):</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(breakdown.basePrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Loại nhôm:</span>
                    <span className="font-medium text-gray-900">
                      ×{breakdown.profileTypeMultiplier.toFixed(2)} {getMultiplierLabel(breakdown.profileTypeMultiplier)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Xử lý bề mặt:</span>
                    <span className="font-medium text-gray-900">
                      ×{breakdown.surfaceTreatmentMultiplier.toFixed(2)} {getMultiplierLabel(breakdown.surfaceTreatmentMultiplier)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Chiết khấu số lượng:</span>
                    <span className="font-medium text-gray-900">
                      ×{breakdown.quantityMultiplier.toFixed(2)} {getMultiplierLabel(breakdown.quantityMultiplier)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Giá sau điều chỉnh (VNĐ/kg):</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(
                          breakdown.basePrice *
                          breakdown.profileTypeMultiplier *
                          breakdown.surfaceTreatmentMultiplier *
                          breakdown.quantityMultiplier
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lượng (kg):</span>
                    <span className="font-medium text-gray-900">
                      {formatNumber(Number(inputValues['quantity']))}
                    </span>
                  </div>

                  <div className="pt-3 border-t-2 border-primary-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-xl font-bold text-primary-600">
                        {formatCurrency(breakdown.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  * Giá chỉ mang tính chất tham khảo. Vui lòng liên hệ để nhận báo giá chính xác.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Validation Message */}
      {!allInputsValid && Object.keys(errors).length === 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Vui lòng điền đầy đủ thông tin hợp lệ để xem kết quả tính toán
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
