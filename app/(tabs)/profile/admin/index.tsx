import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Users, ChevronRight, FileText, LogOut } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function AdminProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Administration</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=200' }} 
            style={styles.profilePhoto} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Thomas Martin</Text>
            <Text style={styles.profileRole}>Administrateur</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion</Text>
          <View style={styles.optionsList}>
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => router.push('/profile/admin/drivers')}
            >
              <View style={styles.optionIconContainer}>
                <Users size={20} color="#0D6EFD" />
              </View>
              <Text style={styles.optionText}>Gestion des chauffeurs</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionIconContainer}>
                <FileText size={20} color="#20C997" />
              </View>
              <Text style={styles.optionText}>Rapports et statistiques</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
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
  profileRole: {
    fontSize: 14,
    color: '#0D6EFD',
    fontWeight: '500',
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
  optionsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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