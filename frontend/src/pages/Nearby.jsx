import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  FiMapPin,
  FiNavigation,
  FiRefreshCw,
  FiHome,
  FiDollarSign,
  FiUser,
  FiCrosshair,
} from "react-icons/fi";
import API from "../services/api";

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const pulsingDot = L.divIcon({
  className: "pulsing-marker-container",
  html: '<div class="pulsing-dot"></div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const userLocationDot = L.divIcon({
  className: "user-location-marker",
  html: '<div class="user-dot"></div><div class="user-pulse"></div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
};

export default function Nearby() {
  const [inventory, setInventory] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Location access denied. Using default view.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );

    // Fetch properties
    API.get("/inventory/all")
      .then((res) => {
        setInventory(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load properties");
      });
  }, []);

  const goToMyLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView(userLocation, 15, {
        animate: true,
        duration: 1.4,
      });
    }
  };

  const openDirections = (address) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-indigo-500 border-indigo-800/30 rounded-full"
        />
      </div>
    );
  }

  const defaultCenter = userLocation || [30.91, 75.85]; // Ludhiana approx fallback

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Floating Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={goToMyLocation}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-medium shadow-xl shadow-indigo-900/40 backdrop-blur-sm border border-indigo-500/30"
        >
          <FiCrosshair size={18} />
          My Location
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.location.reload()}
          className="flex items-center justify-center w-12 h-12 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full text-indigo-300 hover:text-white hover:bg-slate-700/90 shadow-lg"
        >
          <FiRefreshCw size={20} />
        </motion.button>
      </div>

      {/* Map */}
      <MapContainer
        center={defaultCenter}
        zoom={userLocation ? 13 : 11}
        scrollWheelZoom
        zoomControl={false}
        whenReady={() => setMapReady(true)}
        className="h-full w-full"
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={userLocation} zoom={15} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationDot}>
            <Popup className="modern-popup">
              <div className="text-center p-1">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-indigo-600 flex items-center justify-center">
                  <FiUser size={20} />
                </div>
                <p className="font-bold text-lg">You are here</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Property Markers */}
        <AnimatePresence>
          {inventory
            .filter((p) => p.latitude && p.longitude)
            .map((property) => (
              <Marker
                key={property.id}
                position={[property.latitude, property.longitude]}
                icon={pulsingDot}
              >
                <Popup className="modern-popup min-w-[280px]">
                  <div className="space-y-3 p-1">
                    <h3 className="font-bold text-xl text-indigo-300 flex items-center gap-2">
                      <FiHome size={20} />
                      {property.property_name}
                    </h3>

                    <div className="space-y-2 text-slate-300">
                      <p className="flex items-center gap-2">
                        <FiMapPin className="text-rose-400" />
                        {property.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiHome className="text-emerald-400" />
                        {property.property_type || "Residential"}
                      </p>

                      <p className="flex items-center gap-2 font-medium text-lg text-white">
                        <FiDollarSign className="text-amber-400" />
                        ₹ {Number(property.price).toLocaleString("en-IN")}
                      </p>

                      <p className="flex items-center gap-2 text-slate-400">
                        <FiUser className="text-indigo-400" />
                        Owner: {property.owner_name || "—"}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openDirections(property.location)}
                      className="w-full mt-3 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
                    >
                      <FiNavigation size={18} />
                      Get Directions
                    </motion.button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </AnimatePresence>
      </MapContainer>

      {/* Error overlay */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-900/80 backdrop-blur-md border border-red-700/50 text-red-200 px-6 py-3 rounded-xl shadow-2xl z-[1000]"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}