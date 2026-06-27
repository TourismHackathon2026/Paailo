'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default marker issue (VERY IMPORTANT)
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Dynamically import to avoid SSR crash
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

export default function MapPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Dummy Nepal places (works even if DB is empty)
  const places = [
    {
      id: 1,
      name: 'Kathmandu',
      lat: 27.7172,
      lng: 85.3240,
    },
    {
      id: 2,
      name: 'Pokhara',
      lat: 28.2096,
      lng: 83.9856,
    },
    {
      id: 3,
      name: 'Lumbini',
      lat: 27.4833,
      lng: 83.2761,
    },
  ]

  if (!isClient) return <p>Loading map...</p>

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[28.3949, 84.1240]} // Nepal center
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <b>{place.name}</b>
              <br />
              Nepal Tourist Location
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
