import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function NewDriverScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajouter un chauffeur</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo du chauffeur</Text>
          <TouchableOpacity style={styles.photoUpload}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.uploadedPhoto} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Camera size={32} color="#666" />
                <Text style={styles.uploadText}>Ajouter une photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom et prénom du chauffeur"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Numéro de téléphone"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du véhicule</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Type de véhicule</Text>
            <View style={styles.vehicleTypeContainer}>
              <TouchableOpacity style={[styles.vehicleTypeButton, styles.vehicleTypeSelected]}>
                <Text style={[styles.vehicleTypeText, styles.vehicleTypeTextSelected]}>VSL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.vehicleTypeButton}>
                <Text style={styles.vehicleTypeText}>Ambulance</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Numéro d'immatriculation</Text>
            <TextInput
              style={styles.input}
              placeholder="AB-123-CD"
              autoCapitalize="characters"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          
          <TouchableOpacity style={styles.documentUpload}>
            <Upload size={24} color="#0D6EFD" />
            <Text style={styles.documentUploadText}>Permis de conduire</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.documentUpload}>
            <Upload size={24} color="#0D6EFD" />
            <Text style={styles.documentUploadText}>Carte grise</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.documentUpload}>
            <Upload size={24} color="#0D6EFD" />
            <Text style={styles.documentUploadText}>Assurance</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Ajouter le chauffeur</Text>
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
  photoUpload: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    overflow: 'hidden',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
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
  vehicleTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  vehicleTypeSelected: {
    backgroundColor: '#f0f7ff',
    borderColor: '#0D6EFD',
  },
  vehicleTypeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  vehicleTypeTextSelected: {
    color: '#0D6EFD',
  },
  documentUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  documentUploadText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0D6EFD',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});