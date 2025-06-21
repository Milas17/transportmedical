import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Phone, FileQuestion, CircleAlert as AlertCircle, ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function SupportScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aide et support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous contacter</Text>
          
          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <MessageCircle size={24} color="#2E7D32" />
            </View>
            <View style={styles.contactOptionContent}>
              <Text style={styles.contactOptionTitle}>Chat en direct</Text>
              <Text style={styles.contactOptionDescription}>Discutez avec notre équipe</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Phone size={24} color="#1565C0" />
            </View>
            <View style={styles.contactOptionContent}>
              <Text style={styles.contactOptionTitle}>Assistance téléphonique</Text>
              <Text style={styles.contactOptionDescription}>Appelez-nous 24/7</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Centre d'aide</Text>

          <TouchableOpacity style={styles.helpOption}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
              <FileQuestion size={24} color="#E65100" />
            </View>
            <View style={styles.helpOptionContent}>
              <Text style={styles.helpOptionTitle}>FAQ</Text>
              <Text style={styles.helpOptionDescription}>Questions fréquemment posées</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpOption}>
            <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
              <AlertCircle size={24} color="#C2185B" />
            </View>
            <View style={styles.helpOptionContent}>
              <Text style={styles.helpOptionTitle}>Signaler un problème</Text>
              <Text style={styles.helpOptionDescription}>Nous informer d'un incident</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Urgence médicale ?</Text>
          <Text style={styles.emergencyDescription}>
            En cas d'urgence vitale, composez directement le 15 (SAMU) ou le 112
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactOptionContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  contactOptionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpOptionContent: {
    flex: 1,
  },
  helpOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  helpOptionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emergencySection: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#DC3545',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});