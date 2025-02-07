import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "../styles/styles.css";
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";

interface MapProps {
    onMarkerChange: (lat: number, lng: number) => void;
    latFromParent: string | undefined;
    lonFromParent: string | undefined;
}

export default function Map({ onMarkerChange, latFromParent, lonFromParent }: MapProps) {

    const [initialPosition, setInitialPosition] =
        useState<LatLng>(new LatLng(-17.389097205704896, -66.16357889088572))

    useEffect(() => {
        if (latFromParent && lonFromParent) {
            setInitialPosition(new LatLng(parseFloat(latFromParent!), parseFloat(lonFromParent!)))
        }
    }, [latFromParent, lonFromParent])


    return (
        <MapContainer center={initialPosition}
            zoom={16}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AddMarkerOnClick latFromParent={latFromParent} lonFromParent={lonFromParent} onMarkerChange={onMarkerChange} />
            <ChangeView center={initialPosition} />
        </MapContainer>
    )
}

function AddMarkerOnClick({ onMarkerChange, latFromParent, lonFromParent }: MapProps) {
    const [marker, setMarkers] = useState<LatLng>()

    useEffect(() => {
        if (latFromParent && lonFromParent) {
            setMarkers(new LatLng(parseFloat(latFromParent), parseFloat(lonFromParent)))
        }
    }, [latFromParent, lonFromParent])

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

function ChangeView({ center }: { center: LatLng }) {
    const map = useMap()
    map.setView(center, map.getZoom())
    return null;
}