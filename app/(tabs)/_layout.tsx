import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Chrome as Home, MapPin, Clock, User, Calendar } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0D6EFD',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#666',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Réserver',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Suivi',
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historique',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}