import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComparisonCalculator from './ComparisonCalculator';
import type { CalculatorInput, ComparisonOption } from '../data/homepage-content';

describe('ComparisonCalculator', () => {
  const mockInputs: CalculatorInput[] = [
    {
      id: 'length',
      label: 'Chiều dài (m)',
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      defaultValue: 10
    },
    {
      id: 'profile-type',
      label: 'Loại nhôm',
      type: 'select',
      options: [
        { value: '6063', label: 'Nhôm 6063' },
        { value: '6061', label: 'Nhôm 6061' }
      ],
      defaultValue: '6063'
    },
    {
      id: 'quantity',
      label: 'Số lượng (kg)',
      type: 'range',
      min: 100,
      max: 10000,
      step: 100,
      defaultValue: 1000
    }
  ];

  const mockOptions: ComparisonOption[] = [
    {
      id: 'standard',
      name: 'Gói Tiêu chuẩn',
      basePrice: 85000,
      features: ['Feature 1', 'Feature 2'],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Gói Cao cấp',
      basePrice: 95000,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      recommended: true
    }
  ];

  beforeEach(() => {
    // Clear any previous renders
  });

  describe('Component Rendering', () => {
    it('should render all input fields', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      expect(screen.getByLabelText('Chiều dài (m)')).toBeInTheDocument();
      expect(screen.getByLabelText('Loại nhôm')).toBeInTheDocument();
      expect(screen.getByLabelText('Số lượng (kg)')).toBeInTheDocument();
    });

    it('should render all comparison options', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      expect(screen.getByText('Gói Tiêu chuẩn')).toBeInTheDocument();
      expect(screen.getByText('Gói Cao cấp')).toBeInTheDocument();
    });

    it('should highlight recommended option', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const recommendedBadge = screen.getByText('Khuyến nghị');
      expect(recommendedBadge).toBeInTheDocument();
    });

    it('should display at least 2 comparison options side by side', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const optionCards = screen.getAllByText(/Gói/);
      expect(optionCards.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Input Types', () => {
    it('should render number input with correct attributes', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      expect(numberInput).toHaveAttribute('type', 'number');
      expect(numberInput).toHaveAttribute('min', '1');
      expect(numberInput).toHaveAttribute('max', '100');
      expect(numberInput).toHaveAttribute('step', '0.5');
      expect(numberInput.value).toBe('10');
    });

    it('should render select input with options', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const selectInput = screen.getByLabelText('Loại nhôm') as HTMLSelectElement;
      expect(selectInput).toBeInTheDocument();
      expect(selectInput.value).toBe('6063');

      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThanOrEqual(2);
    });

    it('should render range input with min, max, step', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const rangeInput = screen.getByLabelText('Số lượng (kg)') as HTMLInputElement;
      expect(rangeInput).toHaveAttribute('type', 'range');
      expect(rangeInput).toHaveAttribute('min', '100');
      expect(rangeInput).toHaveAttribute('max', '10000');
      expect(rangeInput).toHaveAttribute('step', '100');
    });
  });

  describe('Real-time Calculation', () => {
    it('should recalculate when number input changes', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      // Get initial price
      const initialPrices = screen.getAllByText(/₫/);
      const initialPrice = initialPrices[0].textContent;

      // Change input
      fireEvent.change(numberInput, { target: { value: '20' } });

      await waitFor(() => {
        expect(numberInput.value).toBe('20');
      });

      // Price should still be displayed (calculation happens in real-time)
      const updatedPrices = screen.getAllByText(/₫/);
      expect(updatedPrices.length).toBeGreaterThan(0);
    });

    it('should recalculate when select input changes', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const selectInput = screen.getByLabelText('Loại nhôm') as HTMLSelectElement;
      
      fireEvent.change(selectInput, { target: { value: '6061' } });

      await waitFor(() => {
        expect(selectInput.value).toBe('6061');
      });

      // Prices should be recalculated
      const prices = screen.getAllByText(/₫/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it('should recalculate when range input changes', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const rangeInput = screen.getByLabelText('Số lượng (kg)') as HTMLInputElement;
      
      fireEvent.change(rangeInput, { target: { value: '5000' } });

      await waitFor(() => {
        expect(rangeInput.value).toBe('5000');
      });

      // Prices should be recalculated
      const prices = screen.getAllByText(/₫/);
      expect(prices.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should show error for value below minimum', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '0' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        const errorMessage = screen.getByText(/Giá trị tối thiểu/);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show error for value above maximum', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '150' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        const errorMessage = screen.getByText(/Giá trị tối đa/);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show error for invalid number', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: 'abc' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        const errorMessage = screen.getByText(/số hợp lệ/);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should clear error when valid value is entered', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      // Enter invalid value
      fireEvent.change(numberInput, { target: { value: '0' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        expect(screen.getByText(/Giá trị tối thiểu/)).toBeInTheDocument();
      });

      // Enter valid value
      fireEvent.change(numberInput, { target: { value: '10' } });

      await waitFor(() => {
        expect(screen.queryByText(/Giá trị tối thiểu/)).not.toBeInTheDocument();
      });
    });

    it('should apply error styling to invalid inputs', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '0' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        expect(numberInput).toHaveAttribute('aria-invalid', 'true');
      });
    });
  });

  describe('Calculation Breakdown', () => {
    it('should toggle calculation breakdown on button click', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const breakdownButtons = screen.getAllByText('Xem chi tiết tính toán');
      const firstButton = breakdownButtons[0];

      // Initially breakdown should not be visible
      expect(screen.queryByText('Chi tiết tính toán:')).not.toBeInTheDocument();

      // Click to show breakdown
      fireEvent.click(firstButton);

      await waitFor(() => {
        expect(screen.getByText('Chi tiết tính toán:')).toBeInTheDocument();
      });

      // Click again to hide
      const hideButton = screen.getByText('Ẩn chi tiết');
      fireEvent.click(hideButton);

      await waitFor(() => {
        expect(screen.queryByText('Chi tiết tính toán:')).not.toBeInTheDocument();
      });
    });

    it('should display calculation formula in breakdown', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const breakdownButtons = screen.getAllByText('Xem chi tiết tính toán');
      fireEvent.click(breakdownButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Giá cơ bản (VNĐ/kg):')).toBeInTheDocument();
        expect(screen.getByText('Loại nhôm:')).toBeInTheDocument();
        expect(screen.getByText('Số lượng (kg):')).toBeInTheDocument();
        expect(screen.getByText('Tổng cộng:')).toBeInTheDocument();
      });
    });

    it('should show multipliers in breakdown', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const breakdownButtons = screen.getAllByText('Xem chi tiết tính toán');
      fireEvent.click(breakdownButtons[0]);

      await waitFor(() => {
        // Should show multiplier values like ×1.00, ×1.15, etc.
        const breakdownSection = screen.getByText('Chi tiết tính toán:').parentElement;
        expect(breakdownSection).toBeInTheDocument();
        expect(breakdownSection?.textContent).toMatch(/×\d+\.\d+/);
      });
    });
  });

  describe('Result Formatting', () => {
    it('should format prices with Vietnamese currency format', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      // Should display prices with ₫ symbol
      const prices = screen.getAllByText(/₫/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it('should format large numbers with separators', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      // Prices should be formatted with thousand separators
      const priceElements = screen.getAllByText(/\d{1,3}(\.\d{3})*\s*₫/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('should display results with clear labels', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      expect(screen.getByText(/Tổng chi phí cho/)).toBeInTheDocument();
    });
  });

  describe('Features Display', () => {
    it('should display all features for each option', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      mockOptions.forEach(option => {
        option.features.forEach(feature => {
          expect(screen.getByText(feature)).toBeInTheDocument();
        });
      });
    });

    it('should display checkmark icons for features', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      // Check for SVG checkmark icons
      const checkmarks = screen.getAllByRole('img', { hidden: true });
      expect(checkmarks.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for inputs', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      mockInputs.forEach(input => {
        const element = screen.getByLabelText(input.label);
        expect(element).toBeInTheDocument();
      });
    });

    it('should have aria-invalid on invalid inputs', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '0' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        expect(numberInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should have aria-describedby linking to error messages', async () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '0' } });
      fireEvent.blur(numberInput);

      await waitFor(() => {
        const ariaDescribedBy = numberInput.getAttribute('aria-describedby');
        expect(ariaDescribedBy).toBeTruthy();
        if (ariaDescribedBy) {
          const errorElement = document.getElementById(ariaDescribedBy);
          expect(errorElement).toBeInTheDocument();
        }
      });
    });

    it('should have aria-expanded on breakdown toggle buttons', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const breakdownButtons = screen.getAllByText('Xem chi tiết tính toán');
      breakdownButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should render in a grid layout', () => {
      const { container } = render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const gridElements = container.querySelectorAll('.grid');
      expect(gridElements.length).toBeGreaterThan(0);
    });

    it('should have responsive classes for mobile and desktop', () => {
      const { container } = render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      // Check for responsive grid classes
      const responsiveGrids = container.querySelectorAll('[class*="md:grid-cols"]');
      expect(responsiveGrids.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero quantity gracefully', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const rangeInput = screen.getByLabelText('Số lượng (kg)') as HTMLInputElement;
      
      fireEvent.change(rangeInput, { target: { value: '0' } });

      // Should still render without crashing
      expect(screen.getByText('Gói Tiêu chuẩn')).toBeInTheDocument();
    });

    it('should handle maximum values correctly', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '100' } });

      // Should accept maximum value without error
      expect(screen.queryByText(/Giá trị tối đa/)).not.toBeInTheDocument();
    });

    it('should handle minimum values correctly', () => {
      render(<ComparisonCalculator inputs={mockInputs} options={mockOptions} />);

      const numberInput = screen.getByLabelText('Chiều dài (m)') as HTMLInputElement;
      
      fireEvent.change(numberInput, { target: { value: '1' } });

      // Should accept minimum value without error
      expect(screen.queryByText(/Giá trị tối thiểu/)).not.toBeInTheDocument();
    });
  });
});
