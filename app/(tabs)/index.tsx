import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ambulance, Calendar, Navigation, MapPin, Clock, ArrowRight, Plus, Star, User } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  });

  const quickActions = [
    {
      id: 'emergency',
      title: 'Urgence',
      subtitle: 'Transport immédiat',
      icon: Ambulance,
      color: '#DC3545',
      bgColor: '#FFE8E8',
      action: () => router.push('/booking?emergency=true')
    },
    {
      id: 'book',
      title: 'Réserver',
      subtitle: 'Planifier un transport',
      icon: Calendar,
      color: '#0D6EFD',
      bgColor: '#E8F2FF',
      action: () => router.push('/booking')
    },
    {
      id: 'track',
      title: 'Suivre',
      subtitle: 'Transport en cours',
      icon: MapPin,
      color: '#20C997',
      bgColor: '#E8F5F0',
      action: () => router.push('/track')
    },
    {
      id: 'profile',
      title: 'Profil',
      subtitle: 'Infos patient',
      icon: User,
      color: '#6F42C1',
      bgColor: '#F0E9FF',
      action: () => router.push('/patient-info')
    }
  ];

  const recentTrips = [
    {
      id: '1',
      date: '15 Mai 2024',
      time: '09:30',
      from: 'Domicile',
      to: 'Hôpital Saint-Louis',
      type: 'ambulance',
      status: 'Terminé',
      driverName: 'Laurent Dupont',
      driverPhoto: 'https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8
    },
    {
      id: '2',
      date: '10 Mai 2024',
      time: '14:15',
      from: 'Cabinet Dr. Martin',
      to: 'Résidence Les Pins',
      type: 'vsl',
      status: 'Terminé',
      driverName: 'Sophie Lefèvre',
      driverPhoto: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>Marie Lambert</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={[styles.quickActionCard, { backgroundColor: action.bgColor }]}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Trip Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transport en cours</Text>
            <TouchableOpacity onPress={() => router.push('/track')}>
              <Text style={styles.seeAllText}>Voir détails</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.currentTripCard}>
            <View style={styles.currentTripHeader}>
              <View style={styles.currentTripStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>En route vers vous</Text>
              </View>
              <Text style={styles.etaText}>5 min</Text>
            </View>
            
            <View style={styles.currentTripDetails}>
              <View style={styles.driverInfo}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.driverPhoto}
                />
                <View>
                  <Text style={styles.driverName}>Thomas Martin</Text>
                  <Text style={styles.vehicleInfo}>Ambulance • AB-123-CD</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.trackButton} onPress={() => router.push('/track')}>
                <Text style={styles.trackButtonText}>Suivre</Text>
                <ArrowRight size={16} color="#0D6EFD" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trajets récents</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentTripsContainer}>
            {recentTrips.map((trip) => (
              <TouchableOpacity key={trip.id} style={styles.recentTripCard}>
                <View style={styles.recentTripHeader}>
                  <Text style={styles.recentTripDate}>{trip.date}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{trip.status}</Text>
                  </View>
                </View>
                
                <View style={styles.recentTripRoute}>
                  <Text style={styles.routeText} numberOfLines={1}>{trip.from}</Text>
                  <ArrowRight size={14} color="#999" style={styles.routeArrow} />
                  <Text style={styles.routeText} numberOfLines={1}>{trip.to}</Text>
                </View>
                
                <View style={styles.recentTripFooter}>
                  <View style={styles.driverInfo}>
                    <Image source={{ uri: trip.driverPhoto }} style={styles.smallDriverPhoto} />
                    <Text style={styles.smallDriverName}>{trip.driverName}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{trip.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Urgence médicale ?</Text>
          <Text style={styles.emergencyDescription}>
            En cas d'urgence vitale, composez directement le 15 (SAMU)
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Appeler le 15</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0D6EFD',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  currentTripCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
  currentTripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentTripStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20C997',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  etaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D6EFD',
  },
  currentTripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trackButtonText: {
    color: '#0D6EFD',
    fontWeight: '500',
    marginRight: 4,
  },
  recentTripsContainer: {
    gap: 12,
  },
  recentTripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  recentTripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentTripDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  recentTripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  routeArrow: {
    marginHorizontal: 8,
  },
  recentTripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallDriverPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  smallDriverName: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emergencySection: {
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C62828',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#DC3545',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
