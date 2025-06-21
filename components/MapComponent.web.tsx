import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB629Z4YAelSDYLiW67-VX3DBqWTICSuto';

type MapComponentProps = {
  userLocation?: { lat: number; lng: number };
  driverLocation?: { lat: number; lng: number };
  pickupLocation?: string;
  destinationLocation?: string;
};

export function MapComponent({ 
  userLocation, 
  driverLocation, 
  pickupLocation, 
  destinationLocation 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const defaultLocation = { lat: 48.8566, lng: 2.3522 }; // Paris
        const mapCenter = userLocation || defaultLocation;

        const map = new google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 13,
          styles: [
            {
              featureType: 'poi.medical',
              elementType: 'geometry',
              stylers: [{ color: '#ffeaa7' }]
            },
            {
              featureType: 'poi.medical',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#dc3545' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        mapInstanceRef.current = map;

        // Marqueur pour la position de l'utilisateur
        if (userLocation) {
          new google.maps.Marker({
            position: userLocation,
            map,
            title: 'Votre position',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#0D6EFD" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12),
            },
          });
        }

        // Marqueur pour le chauffeur
        if (driverLocation) {
          new google.maps.Marker({
            position: driverLocation,
            map,
            title: 'Chauffeur',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#20C997"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16),
            },
          });
        }

        // Marqueurs simulés pour départ et destination
        if (pickupLocation) {
          new google.maps.Marker({
            position: { lat: mapCenter.lat + 0.01, lng: mapCenter.lng + 0.01 },
            map,
            title: 'Départ',
            label: 'A',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40S32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#0D6EFD"/>
                  <circle cx="16" cy="16" r="8" fill="white"/>
                  <text x="16" y="20" text-anchor="middle" fill="#0D6EFD" font-family="Arial" font-size="12" font-weight="bold">A</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 40),
              anchor: new google.maps.Point(16, 40),
            },
          });
        }

        if (destinationLocation) {
          new google.maps.Marker({
            position: { lat: mapCenter.lat - 0.01, lng: mapCenter.lng - 0.01 },
            map,
            title: 'Destination',
            label: 'B',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40S32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#DC3545"/>
                  <circle cx="16" cy="16" r="8" fill="white"/>
                  <text x="16" y="20" text-anchor="middle" fill="#DC3545" font-family="Arial" font-size="12" font-weight="bold">B</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 40),
              anchor: new google.maps.Point(16, 40),
            },
          });
        }

        // Ajuster la vue pour inclure tous les marqueurs
        if (pickupLocation && destinationLocation) {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: mapCenter.lat + 0.01, lng: mapCenter.lng + 0.01 });
          bounds.extend({ lat: mapCenter.lat - 0.01, lng: mapCenter.lng - 0.01 });
          if (userLocation) bounds.extend(userLocation);
          if (driverLocation) bounds.extend(driverLocation);
          map.fitBounds(bounds);
        }
      }
    });
  }, [userLocation, driverLocation, pickupLocation, destinationLocation]);

  return <div ref={mapRef} style={styles.mapWeb} />;
}

const styles = StyleSheet.create({
  mapWeb: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});