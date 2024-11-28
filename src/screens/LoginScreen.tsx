import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para validar campos vacíos
  const validateFields = (): boolean => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa un usuario y una contraseña.');
      return false;
    }
    if (!username) {
      Alert.alert('Error', 'Por favor ingresa un usuario.');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Por favor ingresa una contraseña.');
      return false;
    }
    return true;
  };

  // Función para manejar el login
  const handleLogin = async () => {
    // Validación inicial
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await loginUser(username, password);

      // Si se obtiene un token, guardarlo en el contexto y navegar
      if (response.data.token) {
        login(response.data.token);
        navigation.replace('ProductList');
      }
    } catch (error: any) {
      // Errores comunes
      if (error.response?.status === 401) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
      } else {
        Alert.alert(
          'Error',
          'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo más tarde.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default LoginScreen;

