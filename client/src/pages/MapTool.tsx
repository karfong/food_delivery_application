import { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>
        Pinned Location: <br />
        Lat: {position.lat.toFixed(4)} <br />
        Lng: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}

export default function MapTool() {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const defaultCenter: L.LatLngExpression = [51.505, -0.09]; // Default London

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(new L.LatLng(pos.coords.latitude, pos.coords.longitude));
        },
        (err) => {
          alert('Error getting location: ' + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="h-8 w-8 text-blue-600" />
          Location Pinning Tool
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Perfect for food delivery and ride-hailing modules. Click anywhere on the map or drag the pin to select a precise coordinate.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="h-[500px] w-full rounded-xl overflow-hidden z-0">
            <MapContainer 
              center={position || defaultCenter} 
              zoom={13} 
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Location Details</h3>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            {position ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Latitude</span>
                  <p className="text-lg font-mono text-gray-900">{position.lat.toFixed(6)}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Longitude</span>
                  <p className="text-lg font-mono text-gray-900">{position.lng.toFixed(6)}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <MapPin className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p>No location selected. Click on the map to place a pin.</p>
              </div>
            )}
          </div>

          <button
            onClick={handleGetCurrentLocation}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <Navigation className="h-5 w-5" />
            Use Current Location
          </button>

          {position && (
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition-colors shadow-md">
              Confirm Coordinates
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
