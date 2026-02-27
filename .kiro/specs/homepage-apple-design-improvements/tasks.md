# Implementation Plan: Homepage Apple Design Improvements

## Overview

This implementation plan transforms the homepage with Apple-inspired design improvements including a comprehensive design system, 9 new interactive sections, advanced UX effects, mobile enhancements, and performance optimizations. The approach follows an incremental build strategy: establish the design foundation, implement interactive components, add animations and effects, optimize for mobile, and ensure performance and accessibility compliance.

**Tech Stack**: Astro 5.17+, Tailwind CSS 3.4+, React 18.3+, Three.js for 3D

**Key Features**:
- Design system with typography, spacing, color, and animation tokens
- 9 interactive sections (Process Timeline, Animated Counter, 3D Carousel, Before/After Slider, Live Metrics, Trust Badges, Video Testimonials, Interactive Map, Comparison Calculator)
- Advanced UX effects (scroll animations, parallax, magnetic buttons, custom cursor)
- Mobile enhancements (bottom sheets, touch optimization, sticky header, FAB)
- Performance optimization (lazy loading, code splitting, <3s TTI, 60fps animations)
- WCAG 2.1 AA accessibility compliance

## Tasks

- [x] 1. Set up design system foundation
  - [x] 1.1 Extend Tailwind configuration with design tokens
    - Create `tailwind.config.extended.mjs` with typography scale (8 levels: xs to 8xl)
    - Add font weights (100-800), line-heights (1.2-1.8), letter-spacing (-0.05em to 0.1em)
    - Define spacing scale based on 8pt grid (8px to 256px multiples)
    - Configure color palette with primary (9 shades), neutral grays (9 shades), accent colors
    - Add shadow elevation levels (sm, md, lg, xl, 2xl) and glassmorphism utilities
    - Define animation system: easing functions (expo-out, circ-out, spring, apple), durations (fast to slowest), stagger delays
    - Add custom keyframes (fadeIn, slideUp, slideDown, scaleIn, rotateIn, blob, float)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1, 3.2, 3.3, 3.6, 4.1, 4.2, 4.3, 4.6, 4.7_

  - [x] 1.2 Create content data structure files
    - Create `src/data/homepage-content.ts` with TypeScript interfaces for all sections
    - Define interfaces: HomepageContent, HeroSection, ProcessTimelineSection, ProductSection, etc.
    - Populate initial content data for all 9 new sections
    - Add validation for required fields (title, description, images, etc.)
    - _Requirements: 30.1, 30.2, 30.4_

  - [ ]* 1.3 Write property test for design system token compliance
    - **Property 1: Design System Token Compliance**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.1, 3.6**
    - Test that all spacing values are multiples of 8px
    - Test that all font weights are 100-800 in increments of 100
    - Test that all colors come from defined palette
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1_


- [x] 2. Implement Process Timeline section
  - [x] 2.1 Create ProcessTimeline React component
    - Build component with horizontal scroll on desktop, vertical stack on mobile
    - Implement 6 process steps with number, title, description, icon
    - Add scroll snap points for desktop horizontal scrolling
    - Style cards with 320px width, 400px height, 24px gap, rounded corners, shadows
    - Add hover effect (translateY -8px, enhanced shadow)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.7_

  - [x] 2.2 Add scroll-triggered animations to timeline
    - Implement Intersection Observer with 0.2 threshold
    - Add fade + slide up animation on viewport entry
    - Apply stagger delays (100ms between steps)
    - Trigger animation once per element
    - _Requirements: 5.5, 5.6, 14.2, 14.3, 14.5_

  - [ ]* 2.3 Write property test for scroll-triggered animation behavior
    - **Property 5: Scroll-Triggered Animation Behavior**
    - **Validates: Requirements 5.5, 6.2, 14.2, 14.3, 14.5**
    - Test animation triggers at 20% visibility threshold
    - Test animation triggers only once per page load
    - Test Intersection Observer API usage
    - _Requirements: 5.5, 14.2, 14.3, 14.5_

  - [ ]* 2.4 Write property test for animation timing consistency
    - **Property 13: Animation Timing Consistency**
    - **Validates: Requirements 5.6, 14.4, 14.8**
    - Test stagger delays are between 50-150ms
    - Test total animation duration ≤ 1000ms
    - _Requirements: 5.6, 14.4, 14.8_

- [x] 3. Implement Animated Number Counter section
  - [x] 3.1 Create AnimatedCounter React component
    - Build component displaying 4+ metrics with value, label, icon, trend
    - Implement count-up animation using requestAnimationFrame
    - Use cubic easing function (starts fast, decelerates)
    - Complete animation within 2000ms
    - Format large numbers with separators (commas)
    - Add trend indicators with colors (up: green, down: red, neutral: gray)
    - _Requirements: 6.1, 6.3, 6.4, 6.6, 6.7_

  - [x] 3.2 Add Intersection Observer trigger for counter
    - Trigger animation when section reaches 50% visibility
    - Ensure animation triggers only once
    - _Requirements: 6.2, 6.5_

  - [ ]* 3.3 Write property test for number counter animation
    - **Property 14: Number Counter Animation**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.7**
    - Test animation starts from 0
    - Test reaches target value within 2000ms
    - Test easing curve behavior (fast start, slow end)
    - Test number formatting for values > 999
    - _Requirements: 6.2, 6.3, 6.4, 6.7_

- [x] 4. Implement Product 3D Carousel section
  - [x] 4.1 Create Product3DCarousel React component
    - Build carousel with 5+ products displaying image, name, description
    - Implement 3D transform with perspective (1200px) and preserve-3d
    - Apply transforms: center item (scale 1.1, translateZ 0), adjacent (scale 0.9, translateZ -100px), far (scale 0.7, translateZ -200px)
    - Add click/tap navigation buttons with ARIA labels
    - Implement swipe gesture detection (50px threshold)
    - Add keyboard navigation (arrow keys)
    - Implement auto-rotate after 5s inactivity
    - Apply smooth transitions (700ms expo-out easing)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [ ]* 4.2 Write property test for carousel navigation consistency
    - **Property 11: Carousel Navigation Consistency**
    - **Validates: Requirements 7.6, 22.7**
    - Test click/tap navigation works
    - Test swipe gestures work on touch devices (50px threshold)
    - _Requirements: 7.6, 22.7_

  - [ ]* 4.3 Write property test for component data completeness
    - **Property 4: Component Data Completeness**
    - **Validates: Requirements 5.4, 6.6, 7.7, 9.3, 11.2, 12.4**
    - Test all products have required fields (id, name, image, description)
    - Test no empty or null values in required fields
    - _Requirements: 7.7_


- [x] 5. Implement Before/After Comparison Slider
  - [x] 5.1 Create ComparisonSlider React component
    - Build slider with before/after images and draggable handle
    - Implement mouse and touch drag interactions
    - Set default position at 50%
    - Constrain slider position between 0-100%
    - Use clip-path to reveal after image based on position
    - Add visual handle (4px width, white color, shadow)
    - Display "Before" and "After" labels
    - Apply smooth cursor tracking with no lag
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_

  - [ ]* 5.2 Write property test for comparison slider constraints
    - **Property 19: Comparison Slider Constraints**
    - **Validates: Requirements 8.2, 8.3, 8.4, 8.7**
    - Test slider position constrained to 0-100%
    - Test default position is 50%
    - Test mouse and touch drag both work
    - Test smooth tracking without lag
    - _Requirements: 8.2, 8.3, 8.4, 8.7_

- [x] 6. Implement Live Metrics Dashboard
  - [x] 6.1 Create LiveMetricsDashboard React component
    - Build dashboard displaying 4+ metrics with value, label, trend, sparkline
    - Implement update interval (5-10 seconds)
    - Add smooth value transition animations
    - Display trend indicators (up/down/neutral) with distinct colors
    - Format values with appropriate units and precision
    - Implement sparkline mini charts (60x24px SVG with gradient fill)
    - Add loading state and error fallback
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 6.2 Write unit tests for metrics dashboard
    - Test metric updates at correct intervals
    - Test trend calculation logic
    - Test error handling and fallback display
    - _Requirements: 9.2, 9.7_

- [x] 7. Implement Trust Badges Carousel
  - [x] 7.1 Create TrustBadgesCarousel React component
    - Build infinite scrolling carousel with 8+ badges
    - Duplicate badge array for seamless loop
    - Implement CSS animation for continuous scroll (50px/s speed)
    - Pause animation on hover
    - Apply consistent sizing and spacing to badges
    - Add grayscale filter by default, color on hover
    - Use smooth transitions (300ms)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [x] 8. Checkpoint - Verify interactive sections
  - Ensure all 4 sections render correctly
  - Test animations and interactions
  - Verify responsive behavior on mobile
  - Ask the user if questions arise

- [x] 9. Implement Video Testimonials section
  - [x] 9.1 Create VideoTestimonials React component
    - Build section with 3 video testimonials
    - Display video player, customer name, role, company for each
    - Implement custom video controls (play, pause, volume, fullscreen)
    - Show video duration and current playback time
    - Display poster image before playback
    - Add keyboard shortcuts (space, arrows, f for fullscreen)
    - Implement modal/inline player toggle (modal on desktop, inline on mobile)
    - Add auto-pause for other videos when one plays
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [ ]* 9.2 Write property test for video player state management
    - **Property 15: Video Player State Management**
    - **Validates: Requirements 11.7, 11.8**
    - Test only one video plays at a time
    - Test poster image displays before playback
    - _Requirements: 11.7, 11.8_

  - [ ]* 9.3 Write property test for keyboard navigation completeness
    - **Property 8: Keyboard Navigation Completeness**
    - **Validates: Requirements 11.6, 26.2, 26.3**
    - Test all interactive elements accessible via Tab/Shift+Tab
    - Test visible focus indicators with sufficient contrast
    - Test keyboard events (Enter, Space, Escape, Arrow keys)
    - _Requirements: 11.6, 26.2, 26.3_


- [x] 10. Implement Interactive Map section
  - [x] 10.1 Create InteractiveMap React component with Leaflet.js
    - Install react-leaflet library
    - Build map component centered on factory location (lat, lng from content data)
    - Set default zoom level to 15
    - Add marker with popup showing name, address, phone, photo
    - Support zoom and pan with mouse and touch
    - Implement lazy loading (don't load until visible)
    - Add static fallback image for map loading errors
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8_

  - [ ]* 10.2 Write unit tests for map component
    - Test map centers on correct location
    - Test marker popup displays all required fields
    - Test fallback image displays on error
    - _Requirements: 12.4, 12.5, 12.8_

- [x] 11. Implement Comparison Calculator
  - [x] 11.1 Create ComparisonCalculator React component
    - Build calculator with input fields (number, select, range types)
    - Implement real-time calculation on input change
    - Display 2+ comparison options side by side
    - Add input validation (min, max, step constraints)
    - Show error messages for invalid inputs
    - Highlight recommended option
    - Display calculation breakdown showing formula/steps
    - Format results with clear labels and units
    - Disable calculate button until all inputs valid
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8_

  - [ ]* 11.2 Write property test for form input validation
    - **Property 9: Form Input Validation**
    - **Validates: Requirements 13.4, 13.7**
    - Test invalid values rejected with error messages
    - Test min/max/step constraints respected
    - Test calculate button disabled until valid
    - _Requirements: 13.4, 13.7_

- [x] 12. Checkpoint - Verify all 9 interactive sections complete
  - Test all sections render with correct data
  - Verify interactions work on desktop and mobile
  - Check responsive layouts at all breakpoints
  - Ask the user if questions arise

- [x] 13. Implement scroll-triggered animations system
  - [x] 13.1 Create scroll animation utilities
    - Create `src/lib/scroll-animations.ts` with Intersection Observer setup
    - Configure observer options (threshold: 0.2, rootMargin: 0px)
    - Add animation classes (scroll-reveal, stagger-children)
    - Implement CSS animations (fadeIn, slideUp, scaleIn with expo-out easing)
    - Add stagger delays for children (nth-child selectors with 50-150ms delays)
    - Respect prefers-reduced-motion media query
    - Ensure animations trigger only once per element
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.8_

  - [x] 13.2 Apply scroll animations to all major sections
    - Add scroll-reveal class to section containers
    - Add stagger-children class to element groups
    - Test animations on all 9 new sections
    - _Requirements: 14.1_

  - [ ]* 13.3 Write property test for animation performance
    - **Property 3: Animation Performance**
    - **Validates: Requirements 4.4, 4.5, 14.7, 25.2, 26.7, 29.1, 29.2**
    - Test animations only use transform and opacity
    - Test 60fps maintained during execution
    - Test animations disabled when prefers-reduced-motion enabled
    - _Requirements: 4.4, 4.5, 14.7, 25.2, 26.7, 29.1, 29.2_

- [x] 14. Implement parallax effects
  - [x] 14.1 Create parallax utilities
    - Create `src/lib/parallax.ts` with scroll and mouse-move parallax functions
    - Implement scroll parallax with data-parallax attribute (speed multiplier)
    - Implement mouse-move parallax for hero section with data-depth attribute
    - Use transform3d for hardware acceleration
    - Limit parallax movement to prevent excessive motion
    - Disable parallax on mobile (viewport < 768px)
    - Use passive event listeners for performance
    - _Requirements: 15.1, 15.2, 15.4, 15.5, 15.6, 15.7, 15.8_

  - [x] 14.2 Apply parallax to hero, features, and testimonials sections
    - Add parallax to background images and decorative elements
    - Configure appropriate speed values (0.3-0.7 range)
    - Test on at least 3 sections
    - _Requirements: 15.3_

  - [ ]* 14.3 Write property test for parallax effect constraints
    - **Property 17: Parallax Effect Constraints**
    - **Validates: Requirements 15.6, 15.7, 15.8**
    - Test movement limited to prevent excessive motion
    - Test disabled on mobile viewports (< 768px)
    - Test uses transform3d for hardware acceleration
    - _Requirements: 15.6, 15.7, 15.8_


- [x] 15. Implement magnetic buttons effect
  - [x] 15.1 Create magnetic button utilities
    - Create `src/lib/magnetic-buttons.ts` with cursor attraction logic
    - Implement attraction within 100px radius
    - Use spring animation (stiffness: 180, damping: 12)
    - Return button to original position when cursor leaves
    - Maintain button functionality during animation
    - Disable on touch devices (hover: none media query)
    - Prevent buttons from overlapping other content
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.8_

  - [x] 15.2 Apply magnetic effect to primary CTA buttons
    - Add magnetic-button class to at least 5 primary buttons
    - Test attraction and return animations
    - _Requirements: 16.7_

  - [ ]* 15.3 Write property test for magnetic button attraction
    - **Property 18: Magnetic Button Attraction**
    - **Validates: Requirements 16.2, 16.4, 16.6**
    - Test attraction within 100px radius
    - Test return to original position when cursor leaves
    - Test disabled on touch devices
    - _Requirements: 16.2, 16.4, 16.6_

- [x] 16. Implement custom cursor effects
  - [x] 16.1 Create custom cursor component
    - Create `src/lib/custom-cursor.ts` with cursor tracking
    - Implement smooth follow with lerp (0.1 interpolation)
    - Scale cursor on hover over interactive elements
    - Apply different states for links, buttons, draggable elements
    - Use transform3d for hardware acceleration
    - Fade out after 3s inactivity
    - Hide on touch devices (hover: none media query)
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8_

  - [x]* 16.2 Write unit tests for custom cursor
    - Test cursor follows mouse position
    - Test cursor scales on interactive element hover
    - Test cursor hidden on touch devices
    - _Requirements: 17.1, 17.2, 17.4_

- [x] 17. Implement scroll progress indicator
  - [x] 17.1 Create scroll progress component
    - Create fixed progress bar at top of page (height: 3px)
    - Calculate progress: (scrollY / (scrollHeight - viewportHeight)) * 100%
    - Update width on scroll with smooth animation
    - Use gradient color (primary blue to green)
    - Hide when page is not scrollable
    - Use passive scroll listener for performance
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8_

  - [ ]* 17.2 Write property test for scroll progress accuracy
    - **Property 24: Scroll Progress Accuracy**
    - **Validates: Requirements 18.2, 18.3, 18.6, 18.8**
    - Test width equals (scrollY / (scrollHeight - viewportHeight)) * 100%
    - Test hidden when page not scrollable
    - Test updates smoothly without jank
    - _Requirements: 18.2, 18.3, 18.6, 18.8_

- [x] 18. Implement section transitions
  - [x] 18.1 Create section transition effects
    - Implement blur transition for sections with background images
    - Implement fade transition for content sections
    - Implement clip-path reveal transition
    - Trigger transitions when section boundary crosses viewport center
    - Use appropriate easing (expo-out, circ-out)
    - Complete transitions within 500-700ms
    - Disable complex transitions on mobile (< 768px)
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.7, 19.8_

  - [ ]* 18.2 Write unit tests for section transitions
    - Test transitions trigger at viewport center
    - Test duration within 500-700ms range
    - Test disabled on mobile
    - _Requirements: 19.3, 19.5, 19.7_

- [x] 19. Implement micro-interactions for form elements
  - [x] 19.1 Create form micro-interaction styles
    - Add focus animations for input border and label (scale, translate, color change)
    - Add typing feedback (subtle glow or ripple effect)
    - Implement checkbox checkmark draw animation
    - Implement toggle switch spring animation for handle
    - Add validation feedback animations (fade + slide)
    - Add hover effects for all form elements
    - Use colors from design system for all states
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8_

  - [ ]* 19.2 Write unit tests for form micro-interactions
    - Test focus animations trigger correctly
    - Test checkbox animation completes
    - Test toggle switch uses spring physics
    - _Requirements: 20.2, 20.4, 20.5_

- [x] 20. Checkpoint - Verify all UX effects working
  - Test scroll animations on all sections
  - Test parallax effects on hero, features, testimonials
  - Test magnetic buttons and custom cursor
  - Test scroll progress indicator
  - Test section transitions
  - Test form micro-interactions
  - Ask the user if questions arise


- [x] 21. Implement mobile bottom sheet modals
  - [x] 21.1 Create BottomSheet React component
    - Build bottom sheet with slide-up animation (spring physics)
    - Implement swipe-down to dismiss gesture
    - Add drag handle at top of sheet
    - Add backdrop overlay with click-to-dismiss
    - Prevent body scroll when sheet is open
    - Support partial and full-height snap points ([0.5, 1])
    - Only render as bottom sheet on mobile (< 768px)
    - Use spring animation config (stiffness: 180, damping: 26)
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8_

  - [ ]* 21.2 Write property test for modal accessibility pattern
    - **Property 12: Modal Accessibility Pattern**
    - **Validates: Requirements 21.3, 21.6, 21.7**
    - Test focus trapped within modal when open
    - Test closes on Escape key press
    - Test closes on backdrop click
    - Test body scroll prevented when open
    - _Requirements: 21.3, 21.6, 21.7_

- [x] 22. Implement touch-optimized interactive elements
  - [x] 22.1 Create touch optimization utilities
    - Ensure all interactive elements have minimum 44x44px touch targets
    - Add padding to small visual elements to meet touch target requirements
    - Apply minimum 8px gaps between interactive elements
    - Implement tap highlight effects with custom colors
    - Add immediate visual feedback on tap (ripple or scale effect)
    - Disable hover effects on touch devices (hover: none media query)
    - Prevent double-tap zoom on interactive elements (touch-action: manipulation)
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.8_

  - [x] 22.2 Add swipe gesture support to carousels and sliders
    - Implement useSwipeGesture hook with 50px threshold
    - Apply to Product3DCarousel, TrustBadgesCarousel, ComparisonSlider
    - _Requirements: 22.7_

  - [ ]* 22.3 Write property test for touch target accessibility
    - **Property 6: Touch Target Accessibility**
    - **Validates: Requirements 22.1, 22.2, 22.3**
    - Test all interactive elements ≥ 44x44px on mobile (< 768px)
    - Test minimum 8px spacing between adjacent interactive elements
    - _Requirements: 22.1, 22.2, 22.3_

- [x] 23. Implement sticky header with blur effect
  - [x] 23.1 Create sticky header component
    - Fix header to top after 100px scroll
    - Apply backdrop blur (12px) and semi-transparent background when sticky
    - Hide header on scroll down, show on scroll up
    - Return to default state when scroll position is 0
    - Add smooth transitions (300ms)
    - Apply shadow elevation when sticky
    - Maintain navigation functionality in sticky state
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8_

  - [ ]* 23.2 Write property test for sticky header behavior
    - **Property 16: Sticky Header Behavior**
    - **Validates: Requirements 23.1, 23.2, 23.3, 23.4, 23.8**
    - Test becomes sticky after 100px scroll
    - Test backdrop blur applied when sticky
    - Test shows on scroll up, hides on scroll down
    - Test returns to default at scroll position 0
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.8_

- [x] 24. Implement Floating Action Button (FAB)
  - [x] 24.1 Create FAB React component
    - Build FAB visible only on mobile (< 768px)
    - Position fixed at bottom-right (24px spacing)
    - Size at 56x56px for optimal touch interaction
    - Apply elevation shadow and gradient background
    - Animate entrance with scale and fade effects
    - Implement tap to expand menu with action options and labels
    - Keep FAB visible and fixed during scroll
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8_

  - [ ]* 24.2 Write property test for FAB mobile-only display
    - **Property 25: FAB Mobile-Only Display**
    - **Validates: Requirements 24.1, 24.2, 24.6**
    - Test FAB visible only when viewport < 768px
    - Test positioned fixed at bottom-right with spacing
    - Test animates entrance with scale and fade
    - _Requirements: 24.1, 24.2, 24.6_

- [x] 25. Implement responsive layout adaptations
  - [x] 25.1 Apply responsive breakpoints to all sections
    - Define breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
    - Implement single-column layouts on mobile, multi-column on desktop
    - Scale typography proportionally across breakpoints
    - Adapt spacing for each breakpoint
    - Test layout changes on viewport resize
    - Add visual indicators for horizontal scrolling where needed
    - _Requirements: 27.1, 27.2, 27.3, 27.4, 27.5, 27.8_

  - [ ]* 25.2 Write property test for responsive layout adaptation
    - **Property 7: Responsive Layout Adaptation**
    - **Validates: Requirements 5.2, 5.3, 27.3, 27.4, 27.5**
    - Test single-column on mobile (< 768px)
    - Test multi-column on tablet (768-1024px) and desktop (> 1024px)
    - Test typography scales proportionally
    - _Requirements: 27.3, 27.4, 27.5_

- [x] 26. Checkpoint - Verify mobile enhancements complete
  - Test bottom sheets on mobile devices
  - Test touch targets and interactions
  - Test sticky header behavior
  - Test FAB functionality
  - Test responsive layouts at all breakpoints
  - Ask the user if questions arise


- [x] 27. Implement performance optimizations
  - [x] 27.1 Configure lazy loading for images and videos
    - Add loading="lazy" attribute to all images below the fold
    - Add decoding="async" to all images
    - Implement responsive images with srcset and sizes
    - Lazy load video elements until visible
    - _Requirements: 25.3_

  - [x] 27.2 Configure code splitting and lazy loading for React components
    - Use React.lazy() for heavy components (Product3DCarousel, InteractiveMap, VideoTestimonials)
    - Add Suspense boundaries with loading skeletons
    - Configure Astro client directives (client:visible, client:idle, client:only)
    - _Requirements: 25.4, 28.8_

  - [x] 27.3 Configure Vite build optimization
    - Set up manual chunks in vite config (react-vendor, three-vendor, animation, utils)
    - Enable minification with esbuild
    - Configure CSS minification
    - Enable tree shaking for unused code
    - _Requirements: 25.6_

  - [x] 27.4 Optimize images with Astro Image service
    - Configure Sharp image service in astro.config.mjs
    - Set formats to ['avif', 'webp', 'jpg']
    - Set quality to 80
    - Convert all images to use Astro Image component
    - Generate 1x, 2x, 3x versions for different screen densities
    - _Requirements: 25.5, 27.6_

  - [x] 27.5 Implement animation performance optimizations
    - Ensure all animations only use transform and opacity
    - Add will-change sparingly for complex animations only
    - Use requestAnimationFrame for JavaScript animations
    - Batch DOM reads and writes to prevent layout thrashing
    - Use Intersection Observer instead of scroll event listeners
    - Debounce/throttle expensive scroll and resize operations
    - _Requirements: 29.1, 29.2, 29.3, 29.4, 29.5, 29.6, 29.7_

  - [x] 27.6 Implement performance degradation detection
    - Create usePerformanceMonitor hook to detect low FPS
    - Disable complex animations if FPS drops below 30
    - Add no-animations class to simplify animations on low-performance devices
    - _Requirements: 25.8, 29.8_

  - [ ]* 27.7 Write property test for performance budget compliance
    - **Property 20: Performance Budget Compliance**
    - **Validates: Requirements 25.1, 25.7**
    - Test Time to Interactive ≤ 3000ms on 3G
    - Test JavaScript bundle ≤ 300KB
    - Test CSS bundle ≤ 50KB
    - Test Lighthouse performance score ≥ 90
    - _Requirements: 25.1, 25.7_

- [x] 28. Implement accessibility compliance
  - [x] 28.1 Add ARIA patterns to interactive components
    - Add ARIA labels and roles to carousels (region, group, slide, tablist, tab)
    - Add ARIA to modals (dialog, modal, labelledby, describedby)
    - Add ARIA to accordions/expandables (expanded, controls)
    - Add ARIA to form inputs (invalid, describedby, required)
    - _Requirements: 26.6_

  - [x] 28.2 Implement focus management
    - Create useFocusTrap hook for modals
    - Ensure all interactive elements have visible focus indicators
    - Add focus styles with sufficient contrast (3px outline, 2px offset)
    - Implement keyboard shortcuts for carousels and video players
    - _Requirements: 26.2, 26.3_

  - [x] 28.3 Add semantic HTML and proper structure
    - Ensure proper heading hierarchy (h1 → h2 → h3 without skipping)
    - Add landmark regions (header, main, aside, footer) with ARIA roles
    - Add descriptive alt text to all images
    - Use role="presentation" for decorative images
    - _Requirements: 26.4, 26.5_

  - [x] 28.4 Implement reduced motion support
    - Add prefers-reduced-motion media query to disable animations
    - Set animation-duration to 0.01ms when reduced motion preferred
    - Display content in final state immediately when animations disabled
    - _Requirements: 26.7, 26.9_

  - [x] 28.5 Add skip links for keyboard users
    - Create skip link to main content
    - Position skip link off-screen, visible on focus
    - Add tabindex="-1" to main content for focus
    - _Requirements: 26.10_

  - [ ]* 28.6 Write property test for color contrast accessibility
    - **Property 2: Color Contrast Accessibility**
    - **Validates: Requirements 3.5, 26.8**
    - Test all text/background combinations meet 4.5:1 for normal text
    - Test large text (≥ 18px or ≥ 14px bold) meets 3:1
    - _Requirements: 3.5, 26.8_

  - [ ]* 28.7 Write property test for semantic HTML structure
    - **Property 21: Semantic HTML Structure**
    - **Validates: Requirements 26.4, 26.5**
    - Test heading hierarchy follows proper order
    - Test landmark regions properly defined with ARIA
    - Test all images have alt text or role="presentation"
    - _Requirements: 26.4, 26.5_


- [x] 29. Implement content management integration
  - [x] 29.1 Set up content data validation
    - Create TypeScript interfaces for all content types
    - Add runtime validation to catch missing or invalid content
    - Implement fallback content or hide sections when content missing
    - _Requirements: 30.4, 30.7_

  - [x] 29.2 Set up internationalization support
    - Create language-specific content data files structure
    - Implement language detection and content loading
    - Add fallback to default language when translation missing
    - _Requirements: 30.6, 30.7_

  - [x] 29.3 Configure development auto-rebuild
    - Configure Astro to watch content data files
    - Ensure dev server rebuilds on content file changes
    - _Requirements: 30.8_

  - [ ]* 29.4 Write property test for content data validation
    - **Property 22: Content Data Validation**
    - **Validates: Requirements 30.2, 30.4**
    - Test content structure matches TypeScript interfaces
    - Test required fields not null or empty
    - Test invalid content caught during build
    - _Requirements: 30.2, 30.4_

  - [ ]* 29.5 Write property test for internationalization support
    - **Property 23: Internationalization Support**
    - **Validates: Requirements 30.6, 30.7, 30.8**
    - Test loads content from language-specific files
    - Test falls back to default language when translation missing
    - Test rebuilds automatically on content file changes in dev mode
    - _Requirements: 30.6, 30.7, 30.8_

- [x] 30. Integrate all components into homepage
  - [x] 30.1 Update main index.astro file
    - Import all new section components
    - Add Process Timeline section
    - Add Animated Counter section
    - Add Product 3D Carousel section
    - Add Before/After Slider section
    - Add Live Metrics Dashboard section
    - Add Trust Badges Carousel section
    - Add Video Testimonials section
    - Add Interactive Map section
    - Add Comparison Calculator section
    - Apply scroll-reveal classes to all sections
    - Add parallax attributes to hero, features, testimonials
    - _Requirements: 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 13.1_

  - [x] 30.2 Initialize all JavaScript utilities
    - Initialize scroll animations on page load
    - Initialize parallax effects
    - Initialize magnetic buttons
    - Initialize custom cursor
    - Initialize scroll progress indicator
    - Initialize sticky header
    - Ensure all utilities respect reduced motion preferences
    - _Requirements: 14.1, 15.1, 16.1, 17.1, 18.1, 23.1_

  - [x] 30.3 Test complete homepage integration
    - Verify all 9 sections render correctly
    - Test all animations and interactions
    - Test responsive behavior at all breakpoints
    - Test on iOS Safari, Chrome, Firefox, Edge
    - _Requirements: 27.7_

- [x] 31. Run comprehensive testing suite
  - [x] 31.1 Run all property-based tests
    - Execute all 25 property tests with minimum 100 iterations each
    - Verify all properties pass
    - Document any failures and fix issues
    - _Requirements: All requirements covered by properties_

  - [x] 31.2 Run accessibility audit
    - Run axe accessibility tests on all components
    - Test keyboard navigation on all interactive elements
    - Test screen reader compatibility
    - Verify WCAG 2.1 AA compliance
    - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 26.6_

  - [x] 31.3 Run performance audit
    - Run Lighthouse performance test
    - Verify Time to Interactive ≤ 3s on 3G
    - Check bundle sizes (JS ≤ 300KB, CSS ≤ 50KB)
    - Test animation frame rates (60fps target)
    - Verify lazy loading working correctly
    - _Requirements: 25.1, 25.2, 25.3, 25.6, 25.7_

  - [x] 31.4 Run visual regression tests
    - Take screenshots of all sections at different breakpoints
    - Compare against baseline screenshots
    - Document any visual differences
    - _Requirements: 27.1, 27.2, 27.3, 27.4_

- [x] 32. Final checkpoint - Complete implementation verification
  - Verify all 30 requirements implemented
  - Verify all 9 interactive sections working
  - Verify all UX effects functional
  - Verify mobile enhancements complete
  - Verify performance budget met
  - Verify accessibility compliance
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and integration points
- The implementation follows an incremental approach: foundation → components → effects → mobile → optimization → testing
- All animations respect user's reduced motion preferences
- All interactive elements meet WCAG 2.1 AA accessibility standards
- Performance budget: TTI ≤ 3s, JS ≤ 300KB, CSS ≤ 50KB, 60fps animations, Lighthouse ≥ 90

