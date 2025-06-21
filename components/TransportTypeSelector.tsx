import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ambulance, Truck } from 'lucide-react-native';

type TransportTypeSelectorProps = {
  selectedType: string;
  onSelectType: (type: string) => void;
  isEmergency?: boolean;
};

export default function TransportTypeSelector({ 
  selectedType, 
  onSelectType,
  isEmergency = false
}: TransportTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.typeOption,
          selectedType === 'vsl' && styles.typeOptionSelected,
          isEmergency && styles.typeOptionDisabled
        ]}
        onPress={() => !isEmergency && onSelectType('vsl')}
        disabled={isEmergency}
      >
        <View style={[styles.iconContainer, selectedType === 'vsl' && styles.iconContainerSelected]}>
          <Truck 
            size={24} 
            color={selectedType === 'vsl' ? '#fff' : '#0D6EFD'} 
          />
        </View>
        <Text style={[
          styles.typeLabel, 
          selectedType === 'vsl' && styles.typeLabelSelected,
          isEmergency && styles.typeLabelDisabled
        ]}>
          VSL
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeOption,
          selectedType === 'ambulance' && styles.typeOptionSelected,
          isEmergency && { ...styles.typeOptionSelected, opacity: 1 }
        ]}
        onPress={() => onSelectType('ambulance')}
        disabled={isEmergency}
      >
        <View style={[
          styles.iconContainer, 
          selectedType === 'ambulance' && styles.iconContainerSelected,
          isEmergency && styles.iconContainerSelected
        ]}>
          <Ambulance 
            size={24} 
            color={(selectedType === 'ambulance' || isEmergency) ? '#fff' : '#DC3545'} 
          />
        </View>
        <Text style={[
          styles.typeLabel, 
          selectedType === 'ambulance' && styles.typeLabelSelected,
          isEmergency && styles.typeLabelSelected
        ]}>
          Ambulance
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  typeOptionSelected: {
    borderColor: '#0D6EFD',
    backgroundColor: '#f0f7ff',
  },
  typeOptionDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconContainerSelected: {
    backgroundColor: '#0D6EFD',
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  typeLabelSelected: {
    color: '#0D6EFD',
  },
  typeLabelDisabled: {
    color: '#aaa',
  },
});