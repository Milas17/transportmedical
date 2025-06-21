import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft, Send } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = () => {
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }
    // Add password reset logic here
    setSuccess(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Mot de passe oublié ?</Text>
            <Text style={styles.subtitle}>
              Entrez votre adresse email pour réinitialiser votre mot de passe
            </Text>
          </View>

          {success ? (
            <View style={styles.successContainer}>
              <Send size={48} color="#2E7D32" />
              <Text style={styles.successTitle}>Email envoyé !</Text>
              <Text style={styles.successText}>
                Consultez votre boîte mail pour réinitialiser votre mot de passe
              </Text>
              <TouchableOpacity 
                style={styles.returnButton}
                onPress={() => router.back()}
              >
                <Text style={styles.returnButtonText}>Retour à la connexion</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputContainer}>
                <Mail size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  errorText: {
    color: '#DC3545',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 24,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  returnButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  returnButtonText: {
    color: '#0D6EFD',
    fontSize: 16,
    fontWeight: '500',
  },
});