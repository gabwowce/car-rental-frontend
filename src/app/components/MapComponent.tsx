'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { useGetAllCarsApiV1CarsGetQuery } from '@/store/carRentalApi'

type Lokacija = {
  pavadinimas: string
  adresas: string
  miestas: string
}

type Car = {
  automobilio_id: number
  lokacija: Lokacija | null
}

type VietaSuKoordinate = {
  key: string
  pavadinimas: string
  adresas: string
  coords: LatLngExpression | null
}

export default function MapComponent() {
  const { data: cars = [], isLoading } = useGetAllCarsApiV1CarsGetQuery()
  const [vietosKoord, setVietosKoord] = useState<VietaSuKoordinate[]>([])

  useEffect(() => {
    if (!cars.length) return

    const uniqueByAddress = new Map<string, VietaSuKoordinate>()

    const toGeocode = cars
      .filter((car) => car.lokacija?.adresas)
      .map((car) => ({
        key: `${car.lokacija!.adresas}`,
        pavadinimas: car.lokacija!.pavadinimas,
        adresas: car.lokacija!.adresas,
      }))

    const fetchCoords = async () => {
      const results = await Promise.all(
        toGeocode.map(async (v) => {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(v.adresas)}`
          )
          const data = await res.json()
          const coords: LatLngExpression | null = data[0]
            ? [parseFloat(data[0].lat), parseFloat(data[0].lon)]
            : null

          return { ...v, coords }
        })
      )

      results.forEach((v) => {
        if (!uniqueByAddress.has(v.key)) {
          uniqueByAddress.set(v.key, v)
        }
      })

      setVietosKoord(Array.from(uniqueByAddress.values()))
    }

    fetchCoords()
  }, [cars])

  return (
    <div className="border border-gray-300 rounded p-4 mt-6 h-[500px]">
      <MapContainer
        center={[55.1694, 23.8813]}
        zoom={7}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vietosKoord.map(
          (v, idx) =>
            v.coords && (
              <Marker key={idx} position={v.coords}>
                <Popup>
                  <strong>{v.pavadinimas}</strong>
                  <br />
                  {v.adresas}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  )
}
