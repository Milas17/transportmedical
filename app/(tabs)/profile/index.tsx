import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard, Bell, CircleHelp as HelpCircle, Globe, Lock, ChevronRight, LogOut } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200' }} 
            style={styles.profilePhoto} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Marie Lambert</Text>
            <Text style={styles.profilePhone}>+33 6 12 34 56 78</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <View style={styles.optionsList}>
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => router.push('/profile/personal-info')}
            >
              <View style={styles.optionIconContainer}>
                <User size={20} color="#0D6EFD" />
              </View>
              <Text style={styles.optionText}>Informations personnelles</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => router.push('/profile/payment')}
            >
              <View style={styles.optionIconContainer}>
                <CreditCard size={20} color="#20C997" />
              </View>
              <Text style={styles.optionText}>Méthodes de paiement</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionIconContainer}>
                <Bell size={20} color="#DC3545" />
              </View>
              <Text style={styles.optionText}>Notifications</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.optionsList}>
            <View style={styles.optionItem}>
              <View style={styles.optionIconContainer}>
                <Globe size={20} color="#6C757D" />
              </View>
              <Text style={styles.optionText}>Langue</Text>
              <Text style={styles.optionValue}>Français</Text>
            </View>
            
            <View style={styles.optionItem}>
              <View style={styles.optionIconContainer}>
                <Lock size={20} color="#0D6EFD" />
              </View>
              <Text style={styles.optionText}>Mode confidentiel</Text>
              <Switch 
                value={false} 
                onValueChange={() => {}} 
                trackColor={{ false: "#e0e0e0", true: "#BBD6FF" }}
                thumbColor={false ? "#0D6EFD" : "#f4f3f4"}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => router.push('/profile/support')}
            >
              <View style={styles.optionIconContainer}>
                <HelpCircle size={20} color="#20C997" />
              </View>
              <Text style={styles.optionText}>Aide et support</Text>
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
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f7ff',
  },
  editButtonText: {
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
  optionValue: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
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