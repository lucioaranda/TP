import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleButton from '../components/SimpleButton';

import { styles } from '../styles/styles';

type User = {
  username: string;
  password: string;
};

export default function LoginScreen({ navigation }: any) {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Completar usuario y contraseña');
      return;
    }

    try {
      const savedUser = await AsyncStorage.getItem('user');

      if (!savedUser) {
        Alert.alert('No existe usuario registrado');
        return;
      }

      const user: User = JSON.parse(savedUser);

      if (
        user.username === username.trim() &&
        user.password === password
      ) {
        await AsyncStorage.setItem('session', 'true');
        navigation.navigate('Home');
      } else {
        Alert.alert('Usuario o contraseña incorrectos');
      }

    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      Alert.alert('Error al iniciar sesión');
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Iniciar sesión
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

      <SimpleButton
        title="Ingresar"
        onPress={login}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >

        <Text style={styles.link}>
          Ir a Registro
        </Text>

      </TouchableOpacity>

    </View>
  );
}