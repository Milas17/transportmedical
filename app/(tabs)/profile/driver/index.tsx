import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Star, Clock, MapPin, FileText, LogOut } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function DriverProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Chauffeur</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&w=200' }} 
            style={styles.profilePhoto} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Laurent Dupont</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.ratingCount}>(127 avis)</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>En service</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={24} color="#0D6EFD" />
            <Text style={styles.statValue}>152</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          
          <View style={styles.statCard}>
            <MapPin size={24} color="#20C997" />
            <Text style={styles.statValue}>1,250 km</Text>
            <Text style={styles.statLabel}>Parcourus</Text>
          </View>
          
          <View style={styles.statCard}>
            <FileText size={24} color="#DC3545" />
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Acceptation</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Véhicule</Text>
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleType}>Ambulance</Text>
              <Text style={styles.vehiclePlate}>AB-123-CD</Text>
            </View>
            <TouchableOpacity style={styles.vehicleStatusButton}>
              <Text style={styles.vehicleStatusText}>Disponible</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentsList}>
            <View style={styles.documentItem}>
              <FileText size={20} color="#666" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>Permis de conduire</Text>
                <Text style={styles.documentStatus}>Valide jusqu'au 12/2025</Text>
              </View>
            </View>
            
            <View style={styles.documentItem}>
              <FileText size={20} color="#666" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>Carte grise</Text>
                <Text style={styles.documentStatus}>À jour</Text>
              </View>
            </View>
            
            <View style={styles.documentItem}>
              <FileText size={20} color="#666" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>Assurance</Text>
                <Text style={styles.documentStatus}>Renouvellement dans 45 jours</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#DC3545" />
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ratingCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
    paddingLeft: 4,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vehicleStatusButton: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  vehicleStatusText: {
    color: '#0D6EFD',
    fontWeight: '500',
  },
  documentsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  documentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    color: '#333',
  },
  documentStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionButtonsContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#FFEBEE',
  },
  logoutButtonText: {
    color: '#DC3545',
    fontWeight: '500',
    marginLeft: 8,
    fontSize: 16,
  },
});