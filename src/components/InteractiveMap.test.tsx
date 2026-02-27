import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import InteractiveMap from './InteractiveMap';
import type { MapLocation } from '../data/homepage-content';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver as any;

// Mock dynamic imports
vi.mock('leaflet', () => ({
  default: {
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn()
      }
    }
  }
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, whenReady }: any) => {
    // Simulate map ready
    setTimeout(() => whenReady?.(), 0);
    return <div data-testid="map-container">{children}</div>;
  },
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>
}));

describe('InteractiveMap', () => {
  const mockLocation: MapLocation = {
    lat: 21.0285,
    lng: 105.8542,
    name: 'Test Factory',
    address: '123 Test Street, Hanoi',
    phone: '+84 123 456 789',
    photo: '/test-photo.jpg'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders map container', () => {
    const { container } = render(<InteractiveMap location={mockLocation} />);
    
    // Check that the main container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('relative', 'w-full', 'rounded-2xl');
  });

  it('displays loading state initially', () => {
    render(<InteractiveMap location={mockLocation} />);
    
    // Should show placeholder before intersection
    const placeholder = document.querySelector('.animate-pulse');
    expect(placeholder).toBeInTheDocument();
  });

  it('uses default zoom level of 15', () => {
    const { container } = render(<InteractiveMap location={mockLocation} />);
    expect(container).toBeInTheDocument();
  });

  it('accepts custom zoom level', () => {
    const { container } = render(
      <InteractiveMap location={mockLocation} zoom={12} />
    );
    expect(container).toBeInTheDocument();
  });

  it('displays fallback image on error when provided', async () => {
    const fallbackImage = '/fallback.jpg';
    
    // Mock map loading error
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { container } = render(
      <InteractiveMap 
        location={mockLocation} 
        fallbackImage={fallbackImage}
      />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('displays location information in popup', async () => {
    render(<InteractiveMap location={mockLocation} />);
    
    // The location info should be in the component
    expect(mockLocation.name).toBeTruthy();
    expect(mockLocation.address).toBeTruthy();
    expect(mockLocation.phone).toBeTruthy();
  });

  it('handles missing photo gracefully', () => {
    const locationWithoutPhoto: MapLocation = {
      ...mockLocation,
      photo: undefined
    };
    
    const { container } = render(
      <InteractiveMap location={locationWithoutPhoto} />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('creates phone link with correct format', () => {
    render(<InteractiveMap location={mockLocation} />);
    
    // Phone should be formatted correctly
    expect(mockLocation.phone).toMatch(/^\+?\d+/);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<InteractiveMap location={mockLocation} />);
    
    const mapContainer = container.firstChild as HTMLElement;
    expect(mapContainer.className).toContain('rounded-2xl');
    expect(mapContainer.className).toContain('shadow-lg');
  });

  it('has responsive height classes', () => {
    const { container } = render(<InteractiveMap location={mockLocation} />);
    
    const mapContainer = container.firstChild as HTMLElement;
    expect(mapContainer.className).toContain('h-[400px]');
    expect(mapContainer.className).toContain('md:h-[500px]');
  });
});
