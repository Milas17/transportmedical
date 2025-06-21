import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Star, ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const DRIVERS = [
  {
    id: '1',
    name: 'Laurent Dupont',
    photo: 'https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    status: 'active',
    vehicle: 'Ambulance',
    license: 'AB-123-CD',
  },
  {
    id: '2',
    name: 'Sophie Lefèvre',
    photo: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    status: 'active',
    vehicle: 'VSL',
    license: 'EF-456-GH',
  },
  // Add more drivers as needed
];

export default function DriversManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des chauffeurs</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un chauffeur"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/profile/admin/new-driver')}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {DRIVERS.map(driver => (
          <TouchableOpacity key={driver.id} style={styles.driverCard}>
            <Image source={{ uri: driver.photo }} style={styles.driverPhoto} />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.driverDetails}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{driver.rating}</Text>
                </View>
                <Text style={styles.vehicleInfo}>
                  {driver.vehicle} • {driver.license}
                </Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, styles.statusActive]}>
                <Text style={styles.statusText}>Actif</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0D6EFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  vehicleInfo: {
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2E7D32',
  },
});