import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function PatientInfoForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [conditions, setConditions] = useState('');
  const [contact, setContact] = useState('');

  const handleSave = () => {
    console.log({ name, age, conditions, contact });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Marie Dupont"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Âge</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 45"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Conditions médicales</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Ex: diabète, hypertension"
        value={conditions}
        onChangeText={setConditions}
        multiline
      />

      <Text style={styles.label}>Contact d'urgence</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 06 12 34 56 78"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
