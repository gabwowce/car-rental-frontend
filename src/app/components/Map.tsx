"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet's required base styles

/**
 * Basic Leaflet map component centered on Vilnius.
 *
 * This component renders a static map using OpenStreetMap tiles via `react-leaflet`.
 *
 * @returns {JSX.Element} A styled map container with default zoom and center
 *
 * @example
 * <MapComponent />
 */
export default function MapComponent() {
  return (
    <div className="h-96 w-full rounded shadow">
      <MapContainer
        center={[54.6872, 25.2797]} // Vilnius, Lithuania
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
