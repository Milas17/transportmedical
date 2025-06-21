import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function PersonalInfoScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informations personnelles</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre nom"
              defaultValue="Marie Lambert"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre email"
              defaultValue="marie.lambert@example.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre numéro"
              defaultValue="+33 6 12 34 56 78"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations médicales</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Numéro de sécurité sociale</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre numéro"
              defaultValue="1 23 45 67 890 123"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Groupe sanguin</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre groupe sanguin"
              defaultValue="A+"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Allergies</Text>
            <TextInput
              style={styles.input}
              placeholder="Vos allergies"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact d'urgence</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom du contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom du contact"
              defaultValue="Jean Lambert"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Relation</Text>
            <TextInput
              style={styles.input}
              placeholder="Relation"
              defaultValue="Époux"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Numéro du contact"
              defaultValue="+33 6 98 76 54 32"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});