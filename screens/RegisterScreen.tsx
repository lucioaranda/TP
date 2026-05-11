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

export default function RegisterScreen({ navigation }: any) {

  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const register = async () => {

    if (username === '' || password === '') {

      Alert.alert('Completar todos los campos');

      return;
    }

    const user = {
      username,
      password,
    };

    await AsyncStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    Alert.alert('Usuario registrado');

    navigation.navigate('Login');
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