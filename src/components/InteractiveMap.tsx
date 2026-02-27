import React, { useState, useEffect, useRef } from 'react';
import type { MapLocation } from '../data/homepage-content';

interface InteractiveMapProps {
  location: MapLocation;
  zoom?: number;
  fallbackImage?: string;
}

export default function InteractiveMap({ 
  location, 
  zoom = 15, 
  fallbackImage 
}: InteractiveMapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Load map dynamically when visible
  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;

    const loadMap = async () => {
      try {
        // Dynamically import Leaflet and React-Leaflet
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        const { createRoot } = await import('react-dom/client');

        // Fix for default marker icon issue in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        if (!isMounted || !containerRef.current) return;

        // Create map container element
        const mapElement = document.createElement('div');
        mapElement.style.height = '100%';
        mapElement.style.width = '100%';
        containerRef.current.appendChild(mapElement);

        // Create React root and render map
        const root = createRoot(mapElement);
        
        root.render(
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            whenReady={() => {
              if (isMounted) {
                setMapLoaded(true);
              }
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div className="map-popup">
                  {location.photo && (
                    <img 
                      src={location.photo} 
                      alt={location.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {location.phone}
                  </a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        );

        mapRef.current = { root, element: mapElement };
      } catch (error) {
        console.error('Error loading map:', error);
        if (isMounted) {
          setMapError(true);
        }
      }
    };

    loadMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.root.unmount();
        mapRef.current.element.remove();
      }
    };
  }, [isVisible, location, zoom]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Loading state */}
      {isVisible && !mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-600">Đang tải bản đồ...</p>
          </div>
        </div>
      )}

      {/* Fallback image on error */}
      {mapError && fallbackImage && (
        <div className="absolute inset-0 bg-gray-100">
          <img 
            src={fallbackImage} 
            alt="Map fallback"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
              {location.photo && (
                <img 
                  src={location.photo} 
                  alt={location.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <h3 className="font-semibold text-xl mb-2">{location.name}</h3>
              <p className="text-gray-600 mb-2">{location.address}</p>
              <a 
                href={`tel:${location.phone}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {location.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error message without fallback */}
      {mapError && !fallbackImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center max-w-md mx-4 p-6 bg-white rounded-lg shadow-md">
            {location.photo && (
              <img 
                src={location.photo} 
                alt={location.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h3 className="font-semibold text-xl mb-2">{location.name}</h3>
            <p className="text-gray-600 mb-2">{location.address}</p>
            <a 
              href={`tel:${location.phone}`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {location.phone}
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Không thể tải bản đồ. Vui lòng thử lại sau.
            </p>
          </div>
        </div>
      )}

      {/* Placeholder before visible */}
      {!isVisible && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
}
