"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeoCodeMutation } from "@/store/carRentalApi";

// ===== GLOBAL CACHE =====

/**
 * Global cache for geocoded coordinates.
 * Prevents re-geocoding the same address multiple times.
 */
const coordCache = new Map<string, LatLngExpression>();

// Fix missing marker icons (required by Leaflet when used in frameworks like Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ===== Types =====

/**
 * Car data including location object.
 */
type Automobilis = {
  automobilio_id: number;
  marke: string;
  modelis: string;
  numeris: string;
  lokacija: {
    pavadinimas: string;
    adresas: string;
    miestas?: string;
    latitude?: number;
    longitude?: number;
  } | null;
};

/**
 * Extended car object that includes resolved coordinates.
 */
type AutoWithCoords = Automobilis & { coords: LatLngExpression | null };

/**
 * Props for MapComponent, expects a list of cars.
 */
type MapComponentProps = { cars: Automobilis[] };

/**
 * Displays a Leaflet map with car markers using geolocation.
 * - Automatically uses `latitude`/`longitude` if available.
 * - Falls back to geocoding `adresas` via backend mutation.
 * - Caches resolved coordinates globally per address.
 *
 * @param {MapComponentProps} props - List of cars to show on the map
 */
export default function MapComponent({ cars }: MapComponentProps) {
  const [carsWithCoords, setCarsWithCoords] = useState<AutoWithCoords[]>([]);
  const [geoCode] = useGeoCodeMutation();

  useEffect(() => {
    if (!cars.length) {
      setCarsWithCoords([]);
      return;
    }

    const needGeocode: Automobilis[] = [];
    const withCoords: AutoWithCoords[] = [];

    // Split cars into those with direct coordinates and those needing geocoding
    cars.forEach((car) => {
      const loc = car.lokacija;
      if (loc?.latitude && loc?.longitude) {
        withCoords.push({ ...car, coords: [loc.latitude, loc.longitude] });
      } else if (loc?.adresas) {
        const cached = coordCache.get(loc.adresas);
        cached
          ? withCoords.push({ ...car, coords: cached })
          : needGeocode.push(car);
      }
    });

    if (!needGeocode.length) {
      setCarsWithCoords(withCoords);
      return;
    }

    /**
     * Geocode unresolved addresses and merge them into state.
     */
    const fetchCoords = async () => {
      const geocoded: AutoWithCoords[] = [];

      for (const car of needGeocode) {
        const adresas = car.lokacija!.adresas;
        try {
          const { lat, lng } = await geoCode({
            geocodeRequest: { adresas },
          }).unwrap();
          const coords: LatLngExpression | null =
            lat && lng ? [lat, lng] : null;
          if (coords) coordCache.set(adresas, coords); // Cache result globally
          geocoded.push({ ...car, coords });
        } catch (e) {
          console.warn("Geocode failed:", adresas, e);
          geocoded.push({ ...car, coords: null });
        }
      }

      setCarsWithCoords([...withCoords, ...geocoded]);
    };

    fetchCoords();
  }, [cars, geoCode]);

  return (
    <div className="relative z-0 p-4 mt-6 h-[500px]">
      <MapContainer
        center={[55.1694, 23.8813]}
        zoom={7}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='© <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {carsWithCoords
          .filter((c) => c.coords)
          .map((c) => (
            <Marker key={c.automobilio_id} position={c.coords!}>
              <Popup>
                <strong>
                  {c.marke} {c.modelis}
                </strong>
                <br />
                <b>Numeris:</b> {c.numeris}
                <br />
                <b>Adresas:</b> {c.lokacija?.adresas}
                <br />
                {c.lokacija?.miestas && (
                  <>
                    <b>Miestas:</b> {c.lokacija.miestas}
                    <br />
                  </>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
