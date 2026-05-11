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

export default function LoginScreen({ navigation }: any) {

  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const login = async () => {

    const savedUser = await AsyncStorage.getItem('user');

    if (!savedUser) {

      Alert.alert('No existe usuario');

      return;
    }

    const user = JSON.parse(savedUser);

    if (
      user.username === username &&
      user.password === password
    ) {

      navigation.navigate('Home');

    } else {

      Alert.alert('Usuario o contraseña incorrectos');

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
        onPress={login}
      >

        <Text style={styles.buttonText}>
          Ingresar
        </Text>

      </TouchableOpacity>

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