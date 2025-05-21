"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
// Importuoti markerio paveikslėlius iš public katalogo
// const markerIcon = new Icon({
//   iconUrl: "/leaflet/marker-icon.png",
//   shadowUrl: "/leaflet/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

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
  // kiti laukai...
};

type AutoWithCoords = Automobilis & {
  coords: LatLngExpression | null;
};

type MapComponentProps = {
  cars: Automobilis[];
};

export default function MapComponent({ cars }: MapComponentProps) {
  const [carsWithCoords, setCarsWithCoords] = useState<AutoWithCoords[]>([]);

  useEffect(() => {
    if (!cars.length) {
      setCarsWithCoords([]);
      return;
    }

    const needGeocode: Automobilis[] = [];
    const withCoords: AutoWithCoords[] = [];

    cars.forEach((car) => {
      const loc = car.lokacija;
      if (loc && loc.latitude && loc.longitude) {
        withCoords.push({
          ...car,
          coords: [loc.latitude, loc.longitude],
        });
      } else if (loc && loc.adresas) {
        needGeocode.push(car);
      }
    });

    // Jei nieko nereikia geokoduoti, set immediately
    if (needGeocode.length === 0) {
      setCarsWithCoords(withCoords);
      return;
    }

    // Geokoduojam tik tiems, kuriems reikia
    const fetchCoords = async () => {
      const geocoded: AutoWithCoords[] = await Promise.all(
        needGeocode.map(async (car) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(car.lokacija!.adresas)}`
            );
            const data = await res.json();
            const coords: LatLngExpression | null = data[0]
              ? [parseFloat(data[0].lat), parseFloat(data[0].lon)]
              : null;

            return {
              ...car,
              coords,
            };
          } catch (err) {
            // Jei geokodavimas nepavyko
            return { ...car, coords: null };
          }
        })
      );
      setCarsWithCoords([...withCoords, ...geocoded]);
    };

    fetchCoords();
  }, [cars]);

  return (
    <div className="border border-gray-300 rounded p-4 mt-6 h-[500px]">
      <MapContainer
        center={[55.1694, 23.8813]}
        zoom={7}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {carsWithCoords
          .filter((car) => car.coords)
          .map((car) => (
            <Marker
              key={car.automobilio_id}
              position={car.coords as LatLngExpression} // ← nenaudojam icon prop
            >
              <Popup>
                <div>
                  <strong>
                    {car.marke} {car.modelis}
                  </strong>
                  <br />
                  <b>Numeris:</b> {car.numeris}
                  <br />
                  <b>Adresas:</b> {car.lokacija?.adresas}
                  <br />
                  {car.lokacija?.miestas && (
                    <span>
                      <b>Miestas:</b> {car.lokacija?.miestas}
                      <br />
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
