/**
 * Unit tests for form micro-interactions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initFormMicroInteractions,
  initInputGlow,
  initToggleSwitch,
  initValidationFeedback,
  showValidationError,
  showValidationSuccess,
  clearValidationState,
  createToggleSwitch,
} from './form-micro-interactions';

describe('Form Micro-Interactions', () => {
  beforeEach(() => {
    // Mock matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock setTimeout and clearTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('initFormMicroInteractions', () => {
    it('should initialize all form interactions', () => {
      // Create test form with various elements
      const form = document.createElement('form');
      
      const input = document.createElement('input');
      input.className = 'form-input-glow';
      form.appendChild(input);

      const toggle = document.createElement('div');
      toggle.className = 'form-toggle';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      toggle.appendChild(checkbox);
      form.appendChild(toggle);

      document.body.appendChild(form);

      const cleanup = initFormMicroInteractions();

      // Verify initialization
      expect(cleanup).toBeInstanceOf(Function);

      cleanup();
    });

    it('should skip initialization when prefers-reduced-motion is enabled', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const cleanup = initFormMicroInteractions();

      // Should return empty cleanup function
      expect(cleanup).toBeInstanceOf(Function);
    });
  });

  describe('initInputGlow', () => {
    it('should add typing class on input', () => {
      const input = document.createElement('input');
      input.className = 'form-input-glow';
      document.body.appendChild(input);

      const cleanup = initInputGlow(input);

      // Simulate typing
      input.dispatchEvent(new Event('input'));

      expect(input.classList.contains('typing')).toBe(true);

      cleanup();
    });

    it('should remove typing class after 500ms of no typing', () => {
      const input = document.createElement('input');
      input.className = 'form-input-glow';
      document.body.appendChild(input);

      const cleanup = initInputGlow(input);

      // Simulate typing
      input.dispatchEvent(new Event('input'));
      expect(input.classList.contains('typing')).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(500);

      expect(input.classList.contains('typing')).toBe(false);

      cleanup();
    });

    it('should reset timeout on continuous typing', () => {
      const input = document.createElement('input');
      input.className = 'form-input-glow';
      document.body.appendChild(input);

      const cleanup = initInputGlow(input);

      // Simulate typing
      input.dispatchEvent(new Event('input'));
      expect(input.classList.contains('typing')).toBe(true);

      // Type again after 300ms
      vi.advanceTimersByTime(300);
      input.dispatchEvent(new Event('input'));

      // Should still have typing class
      expect(input.classList.contains('typing')).toBe(true);

      // Fast-forward another 500ms
      vi.advanceTimersByTime(500);

      // Now it should be removed
      expect(input.classList.contains('typing')).toBe(false);

      cleanup();
    });
  });

  describe('initToggleSwitch', () => {
    it('should toggle active class when checkbox changes', () => {
      const toggle = document.createElement('div');
      toggle.className = 'form-toggle';
      
      const input = document.createElement('input');
      input.type = 'checkbox';
      toggle.appendChild(input);

      document.body.appendChild(toggle);

      const cleanup = initToggleSwitch(toggle);

      // Initially not active
      expect(toggle.classList.contains('active')).toBe(false);

      // Check the input
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(toggle.classList.contains('active')).toBe(true);

      // Uncheck the input
      input.checked = false;
      input.dispatchEvent(new Event('change'));

      expect(toggle.classList.contains('active')).toBe(false);

      cleanup();
    });

    it('should toggle input when clicking on toggle element', () => {
      const toggle = document.createElement('div');
      toggle.className = 'form-toggle';
      
      const input = document.createElement('input');
      input.type = 'checkbox';
      toggle.appendChild(input);

      document.body.appendChild(toggle);

      const cleanup = initToggleSwitch(toggle);

      // Click on toggle
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(input.checked).toBe(true);
      expect(toggle.classList.contains('active')).toBe(true);

      // Click again
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(input.checked).toBe(false);
      expect(toggle.classList.contains('active')).toBe(false);

      cleanup();
    });

    it('should set initial state based on checkbox checked property', () => {
      const toggle = document.createElement('div');
      toggle.className = 'form-toggle';
      
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = true;
      toggle.appendChild(input);

      document.body.appendChild(toggle);

      const cleanup = initToggleSwitch(toggle);

      // Should be active initially
      expect(toggle.classList.contains('active')).toBe(true);

      cleanup();
    });

    it('should warn if no checkbox input found', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const toggle = document.createElement('div');
      toggle.className = 'form-toggle';
      document.body.appendChild(toggle);

      const cleanup = initToggleSwitch(toggle);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Toggle switch requires an input[type="checkbox"] element'
      );

      cleanup();
      consoleSpy.mockRestore();
    });
  });

  describe('initValidationFeedback', () => {
    it('should show error message on invalid input', () => {
      const form = document.createElement('form');
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      input.required = true;
      inputWrapper.appendChild(input);
      form.appendChild(inputWrapper);
      document.body.appendChild(form);

      const cleanup = initValidationFeedback(form);

      // Trigger invalid event
      Object.defineProperty(input, 'validationMessage', {
        value: 'This field is required',
        writable: true,
      });
      input.dispatchEvent(new Event('invalid'));

      expect(input.classList.contains('error')).toBe(true);
      
      const errorElement = inputWrapper.querySelector('.form-error');
      expect(errorElement).toBeTruthy();
      expect(errorElement?.textContent).toBe('This field is required');

      cleanup();
    });

    it('should show success state on valid input', () => {
      const form = document.createElement('form');
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      input.required = true;
      input.value = 'test';
      inputWrapper.appendChild(input);
      form.appendChild(inputWrapper);
      document.body.appendChild(form);

      const cleanup = initValidationFeedback(form);

      // Mock validity
      Object.defineProperty(input, 'validity', {
        value: { valid: true },
        writable: true,
      });

      // Trigger input event
      input.dispatchEvent(new Event('input'));

      expect(input.classList.contains('success')).toBe(true);
      expect(input.classList.contains('error')).toBe(false);

      cleanup();
    });

    it('should show success message if configured', () => {
      const form = document.createElement('form');
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      input.required = true;
      input.value = 'test';
      input.dataset.successMessage = 'Looks good!';
      inputWrapper.appendChild(input);
      form.appendChild(inputWrapper);
      document.body.appendChild(form);

      const cleanup = initValidationFeedback(form);

      // Mock validity
      Object.defineProperty(input, 'validity', {
        value: { valid: true },
        writable: true,
      });

      // Trigger input event
      input.dispatchEvent(new Event('input'));

      const successElement = inputWrapper.querySelector('.form-success');
      expect(successElement).toBeTruthy();
      expect(successElement?.textContent).toBe('Looks good!');

      cleanup();
    });

    it('should remove error message when input becomes valid', () => {
      const form = document.createElement('form');
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      input.required = true;
      inputWrapper.appendChild(input);
      form.appendChild(inputWrapper);
      document.body.appendChild(form);

      const cleanup = initValidationFeedback(form);

      // First, trigger invalid
      Object.defineProperty(input, 'validationMessage', {
        value: 'This field is required',
        writable: true,
      });
      input.dispatchEvent(new Event('invalid'));

      expect(inputWrapper.querySelector('.form-error')).toBeTruthy();

      // Now make it valid
      input.value = 'test';
      Object.defineProperty(input, 'validity', {
        value: { valid: true },
        writable: true,
      });
      input.dispatchEvent(new Event('input'));

      expect(inputWrapper.querySelector('.form-error')).toBeFalsy();

      cleanup();
    });
  });

  describe('showValidationError', () => {
    it('should show error message programmatically', () => {
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      inputWrapper.appendChild(input);
      document.body.appendChild(inputWrapper);

      showValidationError(input, 'Custom error message');

      expect(input.classList.contains('error')).toBe(true);
      
      const errorElement = inputWrapper.querySelector('.form-error');
      expect(errorElement).toBeTruthy();
      expect(errorElement?.textContent).toBe('Custom error message');
    });
  });

  describe('showValidationSuccess', () => {
    it('should show success state programmatically', () => {
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      inputWrapper.appendChild(input);
      document.body.appendChild(inputWrapper);

      showValidationSuccess(input, 'Success message');

      expect(input.classList.contains('success')).toBe(true);
      
      const successElement = inputWrapper.querySelector('.form-success');
      expect(successElement).toBeTruthy();
      expect(successElement?.textContent).toBe('Success message');
    });

    it('should remove error message when showing success', () => {
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      inputWrapper.appendChild(input);
      document.body.appendChild(inputWrapper);

      // First show error
      showValidationError(input, 'Error');
      expect(inputWrapper.querySelector('.form-error')).toBeTruthy();

      // Then show success
      showValidationSuccess(input);

      expect(inputWrapper.querySelector('.form-error')).toBeFalsy();
      expect(input.classList.contains('error')).toBe(false);
    });
  });

  describe('clearValidationState', () => {
    it('should clear all validation classes and messages', () => {
      const inputWrapper = document.createElement('div');
      const input = document.createElement('input');
      inputWrapper.appendChild(input);
      document.body.appendChild(inputWrapper);

      // Add error state
      showValidationError(input, 'Error');
      expect(input.classList.contains('error')).toBe(true);
      expect(inputWrapper.querySelector('.form-error')).toBeTruthy();

      // Clear state
      clearValidationState(input);

      expect(input.classList.contains('error')).toBe(false);
      expect(input.classList.contains('success')).toBe(false);
      expect(inputWrapper.querySelector('.form-error')).toBeFalsy();
      expect(inputWrapper.querySelector('.form-success')).toBeFalsy();
    });
  });

  describe('createToggleSwitch', () => {
    it('should create a toggle switch element', () => {
      const toggle = createToggleSwitch({
        id: 'test-toggle',
        name: 'test',
        checked: false,
      });

      expect(toggle.classList.contains('form-toggle')).toBe(true);
      
      const input = toggle.querySelector('input[type="checkbox"]');
      expect(input).toBeTruthy();
      expect(input?.id).toBe('test-toggle');
      expect(input?.name).toBe('test');
      expect((input as HTMLInputElement).checked).toBe(false);

      const handle = toggle.querySelector('.form-toggle-handle');
      expect(handle).toBeTruthy();
    });

    it('should create toggle in active state when checked is true', () => {
      const toggle = createToggleSwitch({
        checked: true,
      });

      expect(toggle.classList.contains('active')).toBe(true);
      
      const input = toggle.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('should call onChange callback when toggle changes', () => {
      const onChange = vi.fn();
      
      const toggle = createToggleSwitch({
        checked: false,
        onChange,
      });

      const input = toggle.querySelector('input[type="checkbox"]') as HTMLInputElement;

      // Change the input
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(onChange).toHaveBeenCalledWith(true);

      // Change again
      input.checked = false;
      input.dispatchEvent(new Event('change'));

      expect(onChange).toHaveBeenCalledWith(false);
    });
  });
});
