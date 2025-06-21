import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ambulance, Car, Truck, ArrowRight, Calendar, Star } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

// Sample data
const HISTORY_DATA = [
  {
    id: '1',
    date: '15 Mai 2024',
    time: '09:30',
    from: 'Domicile',
    to: 'Hôpital Saint-Louis',
    type: 'ambulance',
    status: 'Completed',
    driverName: 'Laurent Dupont',
    driverPhoto: 'https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&w=150',
    price: '85,00 €'
  },
  {
    id: '2',
    date: '10 Mai 2024',
    time: '14:15',
    from: 'Cabinet Dr. Martin',
    to: 'Résidence Les Pins',
    type: 'taxi',
    status: 'Completed',
    driverName: 'Sophie Lefèvre',
    driverPhoto: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
    price: '42,50 €'
  },
  {
    id: '3',
    date: '2 Mai 2024',
    time: '11:00',
    from: 'Centre de Radiologie',
    to: 'Domicile',
    type: 'vsl',
    status: 'Completed',
    driverName: 'Michel Bernard',
    driverPhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    price: '65,75 €'
  },
  {
    id: '4',
    date: '25 Avril 2024',
    time: '08:45',
    from: 'Domicile',
    to: 'Hôpital Américain',
    type: 'ambulance',
    status: 'Completed',
    driverName: 'Thomas Martin',
    driverPhoto: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    price: '90,25 €'
  }
];

const getVehicleIcon = (type: string) => {
  switch (type) {
    case 'ambulance':
      return <Ambulance size={20} color="#DC3545" />;
    case 'vsl':
      return <Truck size={20} color="#0D6EFD" />;
    case 'taxi':
      return <Car size={20} color="#20C997" />;
    default:
      return <Car size={20} color="#0D6EFD" />;
  }
};

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  const renderHistoryItem = ({ item }: { item: typeof HISTORY_DATA[0] }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.historyCardHeader}>
        <View style={styles.dateContainer}>
          <Calendar size={16} color="#666" />
          <Text style={styles.dateText}>{item.date} • {item.time}</Text>
        </View>
        <View style={[styles.statusBadge, 
          item.status === 'Completed' ? styles.completedBadge : styles.cancelledBadge]}>
          <Text style={styles.statusText}>
            {item.status === 'Completed' ? 'Terminé' : 'Annulé'}
          </Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.typeIconContainer}>
          {getVehicleIcon(item.type)}
        </View>
        <View style={styles.routeContainer}>
          <Text style={styles.locationText} numberOfLines={1}>{item.from}</Text>
          <View style={styles.routeLineContainer}>
            <View style={styles.routeLine} />
            <ArrowRight size={14} color="#999" />
          </View>
          <Text style={styles.locationText} numberOfLines={1}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.historyCardFooter}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: item.driverPhoto }} style={styles.driverPhoto} />
          <View>
            <Text style={styles.driverName}>{item.driverName}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
        </View>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique</Text>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'taxi', 'vsl', 'ambulance'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text 
              style={[styles.filterButtonText, 
                activeFilter === filter && styles.filterButtonTextActive]}
            >
              {filter === 'all' ? 'Tous' : 
               filter === 'vsl' ? 'VSL' : 
               filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={HISTORY_DATA.filter(item => 
          activeFilter === 'all' ? true : item.type === activeFilter
        )}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#0D6EFD',
  },
  filterButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  cancelledBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#388E3C',
  },
  tripDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  typeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routeContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  routeLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  routeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginRight: 4,
  },
  historyCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});