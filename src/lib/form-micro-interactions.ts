/**
 * Form Micro-Interactions Utility
 * 
 * Provides enhanced form interactions including:
 * - Focus animations for inputs
 * - Typing feedback effects
 * - Checkbox/radio animations
 * - Toggle switch interactions
 * - Validation feedback animations
 * 
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8
 */

/**
 * Initialize form micro-interactions for all form elements
 */
export function initFormMicroInteractions(): () => void {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  const cleanupFunctions: (() => void)[] = [];

  // Initialize input glow effects
  const inputs = document.querySelectorAll<HTMLInputElement>('.form-input-glow');
  inputs.forEach((input) => {
    const cleanup = initInputGlow(input);
    cleanupFunctions.push(cleanup);
  });

  // Initialize toggle switches
  const toggles = document.querySelectorAll<HTMLElement>('.form-toggle');
  toggles.forEach((toggle) => {
    const cleanup = initToggleSwitch(toggle);
    cleanupFunctions.push(cleanup);
  });

  // Initialize validation feedback
  const forms = document.querySelectorAll<HTMLFormElement>('form');
  forms.forEach((form) => {
    const cleanup = initValidationFeedback(form);
    cleanupFunctions.push(cleanup);
  });

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}

/**
 * Initialize glow effect for input on typing
 */
export function initInputGlow(input: HTMLInputElement): () => void {
  let typingTimeout: number;

  const handleInput = () => {
    // Clear existing timeout
    clearTimeout(typingTimeout);

    // Add typing class for visual feedback
    input.classList.add('typing');

    // Remove typing class after 500ms of no typing
    typingTimeout = window.setTimeout(() => {
      input.classList.remove('typing');
    }, 500);
  };

  input.addEventListener('input', handleInput);

  return () => {
    input.removeEventListener('input', handleInput);
    clearTimeout(typingTimeout);
  };
}

/**
 * Initialize toggle switch with spring animation
 */
export function initToggleSwitch(toggle: HTMLElement): () => void {
  const input = toggle.querySelector<HTMLInputElement>('input[type="checkbox"]');
  
  if (!input) {
    console.warn('Toggle switch requires an input[type="checkbox"] element');
    return () => {};
  }

  const handleChange = () => {
    if (input.checked) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  };

  const handleClick = (e: MouseEvent) => {
    // If clicking on the toggle itself (not the input), toggle the input
    if (e.target === toggle) {
      input.checked = !input.checked;
      handleChange();
      
      // Dispatch change event
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
    }
  };

  // Set initial state
  handleChange();

  input.addEventListener('change', handleChange);
  toggle.addEventListener('click', handleClick);

  return () => {
    input.removeEventListener('change', handleChange);
    toggle.removeEventListener('click', handleClick);
  };
}

/**
 * Initialize validation feedback animations
 */
export function initValidationFeedback(form: HTMLFormElement): () => void {
  const handleInvalid = (e: Event) => {
    const input = e.target as HTMLInputElement;
    
    // Add error class
    input.classList.add('error');
    input.classList.remove('success');

    // Find or create error message element
    let errorElement = input.parentElement?.querySelector('.form-error');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      input.parentElement?.appendChild(errorElement);
    }

    // Set error message
    errorElement.textContent = input.validationMessage;
  };

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;

    // Check if input is valid
    if (input.validity.valid) {
      input.classList.remove('error');
      input.classList.add('success');

      // Remove error message
      const errorElement = input.parentElement?.querySelector('.form-error');
      if (errorElement) {
        errorElement.remove();
      }

      // Add success message if configured
      if (input.dataset.successMessage) {
        let successElement = input.parentElement?.querySelector('.form-success');
        
        if (!successElement) {
          successElement = document.createElement('div');
          successElement.className = 'form-success';
          input.parentElement?.appendChild(successElement);
        }

        successElement.textContent = input.dataset.successMessage;
      }
    } else {
      input.classList.remove('success');
      
      // Remove success message
      const successElement = input.parentElement?.querySelector('.form-success');
      if (successElement) {
        successElement.remove();
      }
    }
  };

  // Add event listeners to all form inputs
  const inputs = form.querySelectorAll<HTMLInputElement>('input, textarea, select');
  
  inputs.forEach((input) => {
    input.addEventListener('invalid', handleInvalid);
    input.addEventListener('input', handleInput);
  });

  return () => {
    inputs.forEach((input) => {
      input.removeEventListener('invalid', handleInvalid);
      input.removeEventListener('input', handleInput);
    });
  };
}

/**
 * Programmatically show validation error
 */
export function showValidationError(input: HTMLInputElement, message: string): void {
  input.classList.add('error');
  input.classList.remove('success');

  let errorElement = input.parentElement?.querySelector('.form-error');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    input.parentElement?.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

/**
 * Programmatically show validation success
 */
export function showValidationSuccess(input: HTMLInputElement, message?: string): void {
  input.classList.remove('error');
  input.classList.add('success');

  // Remove error message
  const errorElement = input.parentElement?.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }

  if (message) {
    let successElement = input.parentElement?.querySelector('.form-success');
    
    if (!successElement) {
      successElement = document.createElement('div');
      successElement.className = 'form-success';
      input.parentElement?.appendChild(successElement);
    }

    successElement.textContent = message;
  }
}

/**
 * Clear validation state
 */
export function clearValidationState(input: HTMLInputElement): void {
  input.classList.remove('error', 'success');

  const errorElement = input.parentElement?.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }

  const successElement = input.parentElement?.querySelector('.form-success');
  if (successElement) {
    successElement.remove();
  }
}

/**
 * Create a toggle switch element programmatically
 */
export function createToggleSwitch(options: {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}): HTMLElement {
  const { id, name, checked = false, onChange } = options;

  const toggle = document.createElement('div');
  toggle.className = 'form-toggle';
  if (checked) {
    toggle.classList.add('active');
  }

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  if (id) input.id = id;
  if (name) input.name = name;
  input.style.display = 'none';

  const handle = document.createElement('div');
  handle.className = 'form-toggle-handle';

  toggle.appendChild(input);
  toggle.appendChild(handle);

  // Initialize toggle behavior
  const cleanup = initToggleSwitch(toggle);

  // Add onChange handler
  if (onChange) {
    input.addEventListener('change', () => {
      onChange(input.checked);
    });
  }

  // Store cleanup function on element for later cleanup
  (toggle as any).__cleanup = cleanup;

  return toggle;
}
