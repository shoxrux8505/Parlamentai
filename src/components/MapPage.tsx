import { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  ZoomControl
} from "react-leaflet";
import L from "leaflet";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  ArrowLeft,
  Search,
  Navigation,
  X,
  Compass
} from "lucide-react";
import { toast } from "sonner";

interface MapPageProps {
  services: any[];
  onBack: () => void;
  onNavigate: (view: string) => void;
  onSelectService: (service: any) => void;
}

// Fix Leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapRefresher({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapPage({
  services,
  onBack,
  onNavigate,
  onSelectService
}: MapPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.3111, 69.2797]);

  const categories = ["Barchasi", "Oila huquqi", "Mehnat huquqi", "Mulk huquqi", "Jinoyat huquqi", "Biznes huquqi", "Soliq huquqi"];

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          if (isNavigating) setMapCenter([latitude, longitude]);
        },
        (error) => {
          if (error.code === 3) console.warn("Geolocation timeout");
          else console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isNavigating]);

  const filteredLawyers = useMemo(() => {
    if (!services || !Array.isArray(services)) return [];
    return services.filter(l => {
      const name = l?.name || "";
      const dept = l?.department || "";
      const matchesCategory = selectedCategory === "Barchasi" || dept === selectedCategory;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || dept.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).map((l, i) => ({
      ...l,
      position: l.position || [41.3111 + (i * 0.01) - 0.03, 69.2797 + (i * 0.015) - 0.04] as [number, number]
    }));
  }, [services, selectedCategory, searchQuery]);

  const getRoute = async (destination: [number, number]) => {
    if (!userLocation) {
      toast.info("Joylashuv aniqlanmoqda...");
      return;
    }
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`);
      const data = await response.json();
      if (data.routes?.[0]) {
        const polyline = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
        setRouteData({ polyline, distance: (data.routes[0].distance / 1000).toFixed(1), duration: Math.round(data.routes[0].duration / 60) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const userIcon = L.divIcon({
    html: `<div class="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
    className: '',
    iconSize: [24, 24],
  });

  const createLawyerIcon = (photo: string, online: boolean) => L.divIcon({
    html: `<div class="w-10 h-10 bg-white rounded-xl shadow-xl overflow-hidden border-2 ${online ? 'border-green-500' : 'border-white'}"><img src="${photo}" class="w-full h-full object-cover" /></div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <div className="relative w-full h-full flex-1 flex flex-col overflow-hidden">
      <style>{`
        .leaflet-container { width: 100%; height: 100%; min-height: 500px; z-index: 0; }
        .leaflet-control-container { z-index: 5 !important; }
      `}</style>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex flex-col space-y-3 pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <Button variant="ghost" size="icon" onClick={onBack} className="bg-white shadow-xl rounded-2xl"><ArrowLeft /></Button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Qidiruv..."
              className="w-full h-12 pl-12 rounded-2xl bg-white shadow-xl border-none focus:ring-0 text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {categories.map(c => (
            <button key={c} onClick={() => setSelectedCategory(c)} className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold shadow-lg transition-all ${selectedCategory === c ? "bg-blue-600 text-white" : "bg-white text-slate-500"}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer center={mapCenter as any} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <MapRefresher center={mapCenter} />

          {userLocation && <Marker position={userLocation} icon={userIcon}><Popup>Siz shu yerdasiz</Popup></Marker>}

          {filteredLawyers.map(l => (
            <Marker
              key={l.id}
              position={l.position}
              icon={createLawyerIcon(l.photo, l.online)}
              eventHandlers={{
                click: () => {
                  setMapCenter(l.position);
                  getRoute(l.position);
                }
              }}
            >
              <Popup>
                <div className="p-2 min-w-[140px] flex flex-col items-center">
                  <img src={l.photo} className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-blue-50" />
                  <div className="text-sm font-bold text-slate-900 mb-1">{l.name}</div>
                  <div className="text-[10px] text-slate-500 mb-3">{l.department}</div>
                  <button
                    className="w-full h-9 text-[11px] bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(l);
                    }}
                  >
                    Profilni ko'rish
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {routeData && <Polyline positions={routeData.polyline} pathOptions={{ color: "#3b82f6", weight: 6 }} />}
        </MapContainer>
      </div>

      {/* Footer Info Dock */}
      {routeData && (
        <div className="absolute bottom-28 left-4 right-4 z-40 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-5 flex items-center justify-between">
            <div className="flex-1 flex flex-col items-center border-r border-slate-100/50">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Masofa</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-black text-slate-900">{routeData.distance}</span>
                <span className="text-xs font-bold text-slate-500">km</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vaqt</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-black text-blue-600">{routeData.duration}</span>
                <span className="text-xs font-bold text-blue-600">daq</span>
              </div>
            </div>

            <button
              onClick={() => setRouteData(null)}
              className="w-10 h-10 rounded-full bg-slate-50/80 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Side Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-[1000] flex flex-col space-y-3">
        <Button onClick={() => userLocation ? (setMapCenter(userLocation), setIsNavigating(!isNavigating)) : toast.info("Joylashuv aniqlanmoqda...")} className={`w-12 h-12 rounded-2xl shadow-xl ${isNavigating ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}><Navigation /></Button>
        <Button className="w-12 h-12 rounded-2xl bg-white shadow-xl text-slate-600"><Compass /></Button>
      </div>
    </div>
  );
}
