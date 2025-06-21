import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
  // Coordonnées par défaut (Paris)
  const defaultLocation = { lat: 48.8566, lng: 2.3522 };
  const mapCenter = userLocation || defaultLocation;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: mapCenter.lat,
        longitude: mapCenter.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
    >
      {userLocation && (
        <Marker
          coordinate={{
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          }}
          title="Votre position"
          description="Position actuelle"
          pinColor="blue"
        />
      )}
      
      {driverLocation && (
        <Marker
          coordinate={{
            latitude: driverLocation.lat,
            longitude: driverLocation.lng,
          }}
          title="Chauffeur"
          description="Position du chauffeur"
          pinColor="green"
        />
      )}

      {/* Marqueurs simulés pour les lieux de départ et destination */}
      {pickupLocation && (
        <Marker
          coordinate={{
            latitude: mapCenter.lat + 0.01,
            longitude: mapCenter.lng + 0.01,
          }}
          title="Départ"
          description={pickupLocation}
          pinColor="blue"
        />
      )}

      {destinationLocation && (
        <Marker
          coordinate={{
            latitude: mapCenter.lat - 0.01,
            longitude: mapCenter.lng - 0.01,
          }}
          title="Destination"
          description={destinationLocation}
          pinColor="red"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});