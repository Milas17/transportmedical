import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Plus, ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function PaymentMethodsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Méthodes de paiement</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cartes enregistrées</Text>
          
          <View style={styles.cardsList}>
            <View style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=50' }}
                  style={styles.cardLogo}
                />
                <View>
                  <Text style={styles.cardNumber}>•••• •••• •••• 4242</Text>
                  <Text style={styles.cardExpiry}>Expire 12/25</Text>
                </View>
              </View>
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Principal</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addCardButton}>
              <Plus size={24} color="#0D6EFD" />
              <Text style={styles.addCardText}>Ajouter une carte</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facturation</Text>
          
          <TouchableOpacity style={styles.billingOption}>
            <CreditCard size={24} color="#666" />
            <View style={styles.billingOptionContent}>
              <Text style={styles.billingOptionTitle}>Factures et reçus</Text>
              <Text style={styles.billingOptionDescription}>Gérer vos documents de facturation</Text>
            </View>
            <ChevronRight size={20} color="#999" />
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  cardsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogo: {
    width: 40,
    height: 25,
    marginRight: 12,
    borderRadius: 4,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  addCardText: {
    color: '#0D6EFD',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  billingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  billingOptionContent: {
    flex: 1,
    marginLeft: 12,
  },
  billingOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  billingOptionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});