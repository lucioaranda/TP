import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../styles/styles';

type User = {
  username: string;
  password: string;
};

export default function RegisterScreen({ navigation }: any) {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const register = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Completar todos los campos');
      return;
    }

    if (password.length < 4) {
      Alert.alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    try {
      const user: User = {
        username: username.trim(),
        password,
      };

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      Alert.alert(
        'Usuario registrado',
        'El usuario se registró correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );

      setUsername('');
      setPassword('');

    } catch (error) {
      console.log('Error al registrar usuario:', error);
      Alert.alert('Error al registrar usuario');
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Registrar usuario
      </Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={register}
      >

        <Text style={styles.buttonText}>
          Registrarse
        </Text>

      </TouchableOpacity>

    </View>
  );
}