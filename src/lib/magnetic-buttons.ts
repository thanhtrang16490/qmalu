/**
 * Magnetic Button Utilities
 * 
 * Implements cursor attraction effect for buttons with spring physics animation.
 * Buttons attract the cursor when it comes within 100px radius, then return to
 * original position when cursor leaves. Disabled on touch devices.
 * 
 * Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.8
 */

interface SpringConfig {
  stiffness: number;
  damping: number;
}

interface ButtonState {
  element: HTMLElement;
  originalX: number;
  originalY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
  targetX: number;
  targetY: number;
}

// Spring animation configuration (Requirement 16.3)
const SPRING_CONFIG: SpringConfig = {
  stiffness: 180,
  damping: 12,
};

// Attraction radius in pixels (Requirement 16.2)
const ATTRACTION_RADIUS = 100;

// Maximum movement to prevent overlapping (Requirement 16.8)
const MAX_MOVEMENT = 20;

// Store button states
const buttonStates: Map<HTMLElement, ButtonState> = new Map();

// Animation frame ID
let animationFrameId: number | null = null;

/**
 * Check if device supports hover (not a touch device)
 * Requirement 16.6: Disable on touch devices
 */
function isTouchDevice(): boolean {
  return window.matchMedia('(hover: none)').matches;
}

/**
 * Calculate distance between two points
 */
function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Spring physics animation step
 * Uses spring dynamics with configurable stiffness and damping
 */
function springStep(
  current: number,
  target: number,
  velocity: number,
  config: SpringConfig,
  deltaTime: number
): { position: number; velocity: number } {
  // Spring force: F = -k * x (Hooke's law)
  const springForce = -config.stiffness * (current - target);
  
  // Damping force: F = -c * v
  const dampingForce = -config.damping * velocity;
  
  // Total acceleration: a = F / m (assuming mass = 1)
  const acceleration = springForce + dampingForce;
  
  // Update velocity and position
  const newVelocity = velocity + acceleration * deltaTime;
  const newPosition = current + newVelocity * deltaTime;
  
  return { position: newPosition, velocity: newVelocity };
}

/**
 * Update button position based on cursor position
 * Requirement 16.2: Attraction within 100px radius
 * Requirement 16.4: Return to original position when cursor leaves
 */
function updateButtonPosition(
  state: ButtonState,
  mouseX: number,
  mouseY: number,
  deltaTime: number
): void {
  const rect = state.element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const distance = getDistance(centerX, centerY, mouseX, mouseY);
  
  // Calculate target position based on cursor proximity
  if (distance < ATTRACTION_RADIUS) {
    // Within attraction radius - move toward cursor
    const strength = 1 - distance / ATTRACTION_RADIUS;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    
    // Limit movement to prevent overlapping (Requirement 16.8)
    const moveX = Math.max(-MAX_MOVEMENT, Math.min(MAX_MOVEMENT, dx * strength * 0.3));
    const moveY = Math.max(-MAX_MOVEMENT, Math.min(MAX_MOVEMENT, dy * strength * 0.3));
    
    state.targetX = moveX;
    state.targetY = moveY;
  } else {
    // Outside attraction radius - return to original position (Requirement 16.4)
    state.targetX = 0;
    state.targetY = 0;
  }
  
  // Apply spring physics animation (Requirement 16.3)
  const stepX = springStep(
    state.currentX,
    state.targetX,
    state.velocityX,
    SPRING_CONFIG,
    deltaTime
  );
  
  const stepY = springStep(
    state.currentY,
    state.targetY,
    state.velocityY,
    SPRING_CONFIG,
    deltaTime
  );
  
  state.currentX = stepX.position;
  state.currentY = stepY.position;
  state.velocityX = stepX.velocity;
  state.velocityY = stepY.velocity;
  
  // Apply transform using transform3d for hardware acceleration
  state.element.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;
}

/**
 * Animation loop
 */
let lastTime = performance.now();
let mouseX = 0;
let mouseY = 0;

function animate(): void {
  const currentTime = performance.now();
  const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016); // Cap at 60fps
  lastTime = currentTime;
  
  // Update all button positions
  buttonStates.forEach((state) => {
    updateButtonPosition(state, mouseX, mouseY, deltaTime);
  });
  
  // Continue animation loop
  animationFrameId = requestAnimationFrame(animate);
}

/**
 * Handle mouse move events
 */
function handleMouseMove(event: MouseEvent): void {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

/**
 * Initialize magnetic effect for a button element
 */
function initButton(element: HTMLElement): void {
  // Get initial position
  const rect = element.getBoundingClientRect();
  
  const state: ButtonState = {
    element,
    originalX: rect.left + rect.width / 2,
    originalY: rect.top + rect.height / 2,
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
    targetX: 0,
    targetY: 0,
  };
  
  buttonStates.set(element, state);
  
  // Set initial styles
  element.style.transition = 'none';
  element.style.willChange = 'transform';
}

/**
 * Clean up magnetic effect for a button element
 */
function cleanupButton(element: HTMLElement): void {
  buttonStates.delete(element);
  element.style.transform = '';
  element.style.transition = '';
  element.style.willChange = '';
}

/**
 * Initialize magnetic buttons system
 * 
 * Requirement 16.1: Implement magnetic attraction effect
 * Requirement 16.5: Maintain button functionality during animation
 * Requirement 16.6: Disable on touch devices
 * 
 * @param selector - CSS selector for magnetic buttons (default: '.magnetic-button')
 * @returns Cleanup function to remove event listeners and reset buttons
 */
export function initMagneticButtons(selector: string = '.magnetic-button'): () => void {
  // Don't initialize on touch devices (Requirement 16.6)
  if (isTouchDevice()) {
    return () => {}; // Return no-op cleanup function
  }
  
  // Find all magnetic buttons
  const buttons = document.querySelectorAll<HTMLElement>(selector);
  
  if (buttons.length === 0) {
    return () => {}; // Return no-op cleanup function
  }
  
  // Initialize each button
  buttons.forEach((button) => {
    initButton(button);
  });
  
  // Start mouse tracking
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  
  // Start animation loop if not already running
  if (animationFrameId === null) {
    lastTime = performance.now();
    animate();
  }
  
  // Return cleanup function
  return () => {
    // Remove event listener
    document.removeEventListener('mousemove', handleMouseMove);
    
    // Stop animation loop
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    
    // Clean up all buttons
    buttons.forEach((button) => {
      cleanupButton(button);
    });
    
    // Clear button states
    buttonStates.clear();
  };
}

/**
 * Add magnetic effect to a single button dynamically
 * 
 * @param element - Button element to add magnetic effect to
 * @returns Cleanup function to remove the effect
 */
export function addMagneticButton(element: HTMLElement): () => void {
  // Don't add on touch devices
  if (isTouchDevice()) {
    return () => {};
  }
  
  // Initialize the button
  initButton(element);
  
  // Start mouse tracking if not already active
  if (buttonStates.size === 1) {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    if (animationFrameId === null) {
      lastTime = performance.now();
      animate();
    }
  }
  
  // Return cleanup function
  return () => {
    cleanupButton(element);
    
    // Stop animation if no more buttons
    if (buttonStates.size === 0) {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  };
}
