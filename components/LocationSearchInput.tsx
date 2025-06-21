import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { Locate, MapPin, Clock } from 'lucide-react-native';

type LocationSearchInputProps = {
  placeholder: string;
  onLocationSelect: (location: string) => void;
  value: string;
  showCurrentLocation?: boolean;
  onUseCurrentLocation?: () => void;
};

// Mock location suggestions data - would be replaced with real API calls
const MOCK_SUGGESTIONS = [
  { 
    id: '1', 
    name: 'Hôpital Saint-Louis', 
    address: '1 Avenue Claude Vellefaux, 75010 Paris', 
    type: 'hospital',
    distance: '2.3 km'
  },
  { 
    id: '2', 
    name: 'Centre Médical de l\'Est', 
    address: '45 Rue de la République, 69002 Lyon', 
    type: 'clinic',
    distance: '1.8 km'
  },
  { 
    id: '3', 
    name: 'Clinique des Cèdres', 
    address: '8 Boulevard Michelet, 13008 Marseille', 
    type: 'clinic',
    distance: '3.1 km'
  },
  { 
    id: '4', 
    name: 'Hôpital Américain', 
    address: '63 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine', 
    type: 'hospital',
    distance: '4.2 km'
  },
  { 
    id: '5', 
    name: 'Centre de Rééducation Fonctionnelle', 
    address: '12 Avenue des Pins, 33000 Bordeaux', 
    type: 'rehabilitation',
    distance: '5.7 km'
  },
  { 
    id: '6', 
    name: 'Cabinet Dr. Martin', 
    address: '25 Rue Victor Hugo, 69003 Lyon', 
    type: 'doctor',
    distance: '0.9 km'
  },
  { 
    id: '7', 
    name: 'Pharmacie de la Gare', 
    address: '3 Place de la Gare, 75010 Paris', 
    type: 'pharmacy',
    distance: '1.2 km'
  },
  { 
    id: '8', 
    name: 'Centre de Radiologie Moderne', 
    address: '18 Avenue Jean Jaurès, 13001 Marseille', 
    type: 'radiology',
    distance: '2.8 km'
  }
];

const RECENT_LOCATIONS = [
  { id: 'r1', name: 'Domicile', address: '15 Rue de la Paix, Paris', type: 'home' },
  { id: 'r2', name: 'Bureau', address: '42 Avenue des Champs-Élysées, Paris', type: 'work' },
];

export default function LocationSearchInput({ 
  placeholder, 
  onLocationSelect, 
  value,
  showCurrentLocation = false,
  onUseCurrentLocation
}: LocationSearchInputProps) {
  const [searchText, setSearchText] = useState(value);
  const [suggestions, setSuggestions] = useState<typeof MOCK_SUGGESTIONS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    setSearchText(value);
  }, [value]);

  useEffect(() => {
    if (searchText.length > 1) {
      // Simuler un appel API avec délai
      const timeoutId = setTimeout(() => {
        const filteredSuggestions = MOCK_SUGGESTIONS.filter(suggestion =>
          suggestion.name.toLowerCase().includes(searchText.toLowerCase()) ||
          suggestion.address.toLowerCase().includes(searchText.toLowerCase())
        ).slice(0, 5); // Limiter à 5 résultats
        
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setShowRecent(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText]);

  const handleSelectLocation = (location: typeof MOCK_SUGGESTIONS[0] | typeof RECENT_LOCATIONS[0]) => {
    const fullLocation = `${location.name}, ${location.address}`;
    setSearchText(location.name);
    onLocationSelect(fullLocation);
    setShowSuggestions(false);
    setShowRecent(false);
  };

  const handleFocus = () => {
    if (searchText.length === 0) {
      setShowRecent(true);
    } else if (searchText.length > 1) {
      setShowSuggestions(true);
    }
  };

  const handleCurrentLocation = () => {
    onUseCurrentLocation?.();
    setShowSuggestions(false);
    setShowRecent(false);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return '🏥';
      case 'clinic':
        return '🏥';
      case 'doctor':
        return '👨‍⚕️';
      case 'pharmacy':
        return '💊';
      case 'radiology':
        return '🔬';
      case 'rehabilitation':
        return '🏥';
      case 'home':
        return '🏠';
      case 'work':
        return '🏢';
      default:
        return '📍';
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        onFocus={handleFocus}
        onBlur={() => {
          // Délai pour permettre la sélection
          setTimeout(() => {
            setShowSuggestions(false);
            setShowRecent(false);
          }, 200);
        }}
      />
      
      {(showSuggestions || showRecent) && (
        <View style={styles.suggestionsContainer}>
          {showCurrentLocation && (
            <TouchableOpacity 
              style={styles.currentLocationItem}
              onPress={handleCurrentLocation}
            >
              <Locate size={20} color="#0D6EFD" />
              <Text style={styles.currentLocationText}>Utiliser ma position actuelle</Text>
            </TouchableOpacity>
          )}

          {showRecent && RECENT_LOCATIONS.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Clock size={16} color="#666" />
                <Text style={styles.sectionTitle}>Récents</Text>
              </View>
              {RECENT_LOCATIONS.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text style={styles.locationIcon}>{getLocationIcon(item.type)}</Text>
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionName}>{item.name}</Text>
                    <Text style={styles.suggestionAddress}>{item.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <>
              {showRecent && <View style={styles.separator} />}
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.suggestionItem}
                    onPress={() => handleSelectLocation(item)}
                  >
                    <Text style={styles.locationIcon}>{getLocationIcon(item.type)}</Text>
                    <View style={styles.suggestionContent}>
                      <Text style={styles.suggestionName}>{item.name}</Text>
                      <Text style={styles.suggestionAddress}>{item.address}</Text>
                    </View>
                    <Text style={styles.suggestionDistance}>{item.distance}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              />
            </>
          )}

          {showSuggestions && suggestions.length === 0 && searchText.length > 1 && (
            <View style={styles.noResultsContainer}>
              <MapPin size={20} color="#999" />
              <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 2,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50,
    left: -12,
    right: -12,
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 300,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currentLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9ff',
  },
  currentLocationText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0D6EFD',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  suggestionAddress: {
    fontSize: 14,
    color: '#666',
  },
  suggestionDistance: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  noResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultsText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#999',
  },
});