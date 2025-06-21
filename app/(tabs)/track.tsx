import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapComponent } from '@/components/MapComponent';
import { Phone, MessageCircle, X } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function TrackScreen() {
  const [tracking, setTracking] = useState(true);
  const [tripData, setTripData] = useState({
    driver: {
      name: 'Thomas Martin',
      rating: 4.8,
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    vehicle: {
      type: 'Ambulance',
      licensePlate: 'AB-123-CD',
      eta: '5 min'
    },
    trip: {
      status: 'En route',
      from: 'Votre position actuelle',
      to: 'Hôpital Saint-Louis, Paris'
    }
  });

  // Simulate driver location updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual API calls to get driver location
      console.log('Updating driver location...');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.mapContainer}>
        <MapComponent />
        
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>{tripData.trip.status}</Text>
          <TouchableOpacity style={styles.closeButton}>
            <X size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {tracking && (
          <View style={styles.tripInfoCard}>
            <View style={styles.tripHeader}>
              <View style={styles.driverInfo}>
                <Image 
                  source={{ uri: tripData.driver.photo }} 
                  style={styles.driverPhoto}
                />
                <View>
                  <Text style={styles.driverName}>{tripData.driver.name}</Text>
                  <Text style={styles.vehicleInfo}>{tripData.vehicle.type} • {tripData.vehicle.licensePlate}</Text>
                </View>
              </View>
              <View style={styles.etaContainer}>
                <Text style={styles.etaLabel}>Arrivée</Text>
                <Text style={styles.etaTime}>{tripData.vehicle.eta}</Text>
              </View>
            </View>

            <View style={styles.tripRouteInfo}>
              <View style={styles.routePoints}>
                <View style={styles.routePointDot} />
                <View style={styles.routeLine} />
                <View style={[styles.routePointDot, styles.routePointDestination]} />
              </View>
              <View style={styles.routeLabels}>
                <Text style={styles.routeText} numberOfLines={1}>{tripData.trip.from}</Text>
                <Text style={styles.routeText} numberOfLines={1}>{tripData.trip.to}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color="#0D6EFD" />
                <Text style={styles.actionButtonText}>Appeler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#0D6EFD" />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  topBar: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  topBarText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
  },
  tripInfoCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  driverName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  vehicleInfo: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  etaContainer: {
    alignItems: 'center',
  },
  etaLabel: {
    fontSize: 12,
    color: '#666',
  },
  etaTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D6EFD',
  },
  tripRouteInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  routePoints: {
    marginRight: 12,
    alignItems: 'center',
    paddingTop: 6,
  },
  routePointDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D6EFD',
    marginBottom: 4,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#0D6EFD',
    marginBottom: 4,
  },
  routePointDestination: {
    backgroundColor: '#DC3545',
  },
  routeLabels: {
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  routeText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
  },
  actionButtonText: {
    color: '#0D6EFD',
    fontWeight: '500',
    marginLeft: 8,
  },
});