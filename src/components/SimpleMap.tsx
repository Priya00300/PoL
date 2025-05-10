import React, { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';

// Define the interface for location points
interface LocationPoint {
  id: string;
  label: string;
  longitude: number;
  latitude: number;
}

interface SimpleMapProps {
  locations: LocationPoint[];
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  height?: string;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  locations,
  initialViewState = {
    longitude: 0,
    latitude: 0,
    zoom: 1,
  },
  height = '400px',
}) => {
  const [viewState, setViewState] = useState(initialViewState);

  // Use OpenStreetMap as the mapping source
  const OPEN_STREET_MAP_STYLE = {
    version: 8,
    sources: {
      'osm-tiles': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors',
      },
    },
    layers: [
      {
        id: 'osm-tiles',
        type: 'raster',
        source: 'osm-tiles',
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded overflow-hidden border border-gray-200">
      <Map
        mapStyle={OPEN_STREET_MAP_STYLE}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        attributionControl={true}
      >
        <NavigationControl position="top-right" />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            <div className="relative group">
              <MapPin size={24} className="text-primary" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {location.label}
              </div>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default SimpleMap;