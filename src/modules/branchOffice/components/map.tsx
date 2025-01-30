import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "../styles/styles.css";
import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { LatLng } from "leaflet";

interface MapProps {
    onMarkerChange: (lat: number, lng: number) => void;
}

export default function Map({ onMarkerChange }: MapProps) {
    return (
        <MapContainer center={{ lat: -17.389097205704896, lng: -66.16357889088572 }} zoom={16}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AddMarkerOnClick onMarkerChange={onMarkerChange} />
        </MapContainer>
    )
}

function AddMarkerOnClick({ onMarkerChange }: MapProps) {
    const [marker, setMarkers] = useState<LatLng>()

    useMapEvents({
        click(e) {
            const newMarker = e.latlng;
            setMarkers(newMarker);
            onMarkerChange(newMarker.lat, newMarker.lng);
        }
    })

    return (
        marker && (
            <Marker position={marker}>
                <Popup>
                    Marcador en {marker.lat}, {marker.lng}
                </Popup>
            </Marker>
        )
    )
}