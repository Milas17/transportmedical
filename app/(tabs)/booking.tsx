import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ambulance, Calendar, Navigation, MapPin, Clock, ArrowRight, Locate, ArrowUpDown, CreditCard, User } from 'lucide-react-native';
import LocationSearchInput from '@/components/LocationSearchInput';
import TransportTypeSelector from '@/components/TransportTypeSelector';
import { MapComponent } from '@/components/MapComponent';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

export default function BookingScreen() {
  const [transportType, setTransportType] = useState('taxi');
  const [isEmergency, setIsEmergency] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  const [scheduledDate, setScheduledDate] = useState('Maintenant');
  const [scheduledTime, setScheduledTime] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  
  const handleBooking = () => {
    // Handle booking logic
    console.log({
      transportType,
      isEmergency,
      pickupLocation,
      destinationLocation,
      scheduledDate,
      scheduledTime,
      passengerCount,
      specialRequests
    });
  };

  const handleUseCurrentLocation = () => {
    // Simuler la géolocalisation (en production, utiliser expo-location)
    setPickupLocation('Position actuelle');
    setUserLocation({ lat: 48.8566, lng: 2.3522 });
  };

  const swapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const estimatedPrice = transportType === 'ambulance' ? '85-120€' : transportType === 'vsl' ? '45-75€' : '25-45€';
  const estimatedTime = isEmergency ? '5-10 min' : '15-25 min';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Réserver un Transport</Text>
        <TouchableOpacity 
          style={styles.mapToggle}
          onPress={() => setShowMap(!showMap)}
        >
          <MapPin size={20} color={showMap ? '#0D6EFD' : '#666'} />
        </TouchableOpacity>
      </View>

      {showMap && (
        <View style={styles.mapContainer}>
          <MapComponent 
            userLocation={userLocation}
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
          />
        </View>
      )}

      <ScrollView 
        style={[styles.content, showMap && styles.contentWithMap]} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Toggle */}
        <TouchableOpacity
          style={[styles.emergencyButton, isEmergency && styles.emergencyButtonActive]}
          onPress={() => setIsEmergency(!isEmergency)}
        >
          <Ambulance size={24} color={isEmergency ? '#fff' : '#DC3545'} />
          <Text style={[styles.emergencyButtonText, isEmergency && styles.emergencyButtonTextActive]}>
            {isEmergency ? 'Transport d\'urgence activé' : 'Transport d\'urgence'}
          </Text>
        </TouchableOpacity>

        {/* Transport Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de transport</Text>
          <TransportTypeSelector
            selectedType={transportType}
            onSelectType={setTransportType}
            isEmergency={isEmergency}
          />
        </View>

        {/* Location Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinéraire</Text>
          
          <View style={styles.locationSection}>
            <View style={styles.locationInputContainer}>
              <MapPin size={20} color="#0D6EFD" style={styles.locationIcon} />
              <LocationSearchInput
                placeholder="Lieu de départ"
                onLocationSelect={setPickupLocation}
                value={pickupLocation}
                showCurrentLocation={true}
                onUseCurrentLocation={handleUseCurrentLocation}
              />
            </View>

            <View style={styles.swapButtonContainer}>
              <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
                <ArrowUpDown size={16} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.locationInputContainer}>
              <Navigation size={20} color="#DC3545" style={styles.locationIcon} />
              <LocationSearchInput
                placeholder="Destination"
                onLocationSelect={setDestinationLocation}
                value={destinationLocation}
                showCurrentLocation={false}
              />
            </View>
          </View>
        </View>

        {/* Scheduling */}
        {!isEmergency && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planification</Text>
            <View style={styles.schedulingSection}>
              <TouchableOpacity 
                style={[styles.schedulingOption, scheduledDate === 'Maintenant' && styles.schedulingOptionActive]}
                onPress={() => setScheduledDate('Maintenant')}
              >
                <Clock size={20} color={scheduledDate === 'Maintenant' ? '#fff' : '#0D6EFD'} />
                <Text style={[styles.schedulingText, scheduledDate === 'Maintenant' && styles.schedulingTextActive]}>
                  Maintenant
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.schedulingOption, scheduledDate !== 'Maintenant' && styles.schedulingOptionActive]}
                onPress={() => setScheduledDate('Programmer')}
              >
                <Calendar size={20} color={scheduledDate !== 'Maintenant' ? '#fff' : '#0D6EFD'} />
                <Text style={[styles.schedulingText, scheduledDate !== 'Maintenant' && styles.schedulingTextActive]}>
                  Programmer
                </Text>
              </TouchableOpacity>
            </View>

            {scheduledDate !== 'Maintenant' && (
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity style={styles.dateTimeButton}>
                  <Text style={styles.dateTimeText}>Aujourd'hui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTimeButton}>
                  <Text style={styles.dateTimeText}>14:30</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Passenger Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du transport</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <User size={20} color="#666" />
              <Text style={styles.detailLabel}>Nombre de passagers</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{passengerCount}</Text>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setPassengerCount(Math.min(4, passengerCount + 1))}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Price Estimation */}
        {pickupLocation && destinationLocation && (
          <View style={styles.estimationCard}>
            <Text style={styles.estimationTitle}>Estimation</Text>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Prix estimé</Text>
              <Text style={styles.estimationValue}>{estimatedPrice}</Text>
            </View>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Temps d'arrivée</Text>
              <Text style={styles.estimationValue}>{estimatedTime}</Text>
            </View>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Distance</Text>
              <Text style={styles.estimationValue}>12.5 km</Text>
            </View>
          </View>
        )}

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <CreditCard size={20} color="#666" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentText}>Carte •••• 4242</Text>
              <Text style={styles.paymentSubtext}>Visa</Text>
            </View>
            <ArrowRight size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={[
            styles.bookButton, 
            isEmergency && styles.emergencyBookButton,
            (!pickupLocation || !destinationLocation) && styles.bookButtonDisabled
          ]}
          onPress={handleBooking}
          disabled={!pickupLocation || !destinationLocation}
        >
          <Text style={styles.bookButtonText}>
            {isEmergency ? 'Commander en urgence' : 'Confirmer la réservation'}
          </Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  mapToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f7',
  },
  mapContainer: {
    height: height * 0.25,
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  contentWithMap: {
    flex: 0.75,
  },
  contentContainer: {
    padding: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD0D0',
  },
  emergencyButtonActive: {
    backgroundColor: '#DC3545',
    borderColor: '#DC3545',
  },
  emergencyButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
  emergencyButtonTextActive: {
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  locationSection: {
    position: 'relative',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    minHeight: 48,
  },
  locationIcon: {
    marginRight: 8,
  },
  swapButtonContainer: {
    position: 'absolute',
    right: 16,
    top: 36,
    zIndex: 10,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  schedulingSection: {
    flexDirection: 'row',
    gap: 12,
  },
  schedulingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  schedulingOptionActive: {
    backgroundColor: '#0D6EFD',
    borderColor: '#0D6EFD',
  },
  schedulingText: {
    marginLeft: 6,
    color: '#0D6EFD',
    fontWeight: '500',
  },
  schedulingTextActive: {
    color: '#fff',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  dateTimeButton: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateTimeText: {
    color: '#333',
    fontWeight: '500',
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 4,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  counterValue: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  estimationCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  estimationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  estimationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  estimationLabel: {
    fontSize: 14,
    color: '#666',
  },
  estimationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D6EFD',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  emergencyBookButton: {
    backgroundColor: '#DC3545',
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});