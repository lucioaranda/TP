import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import { styles } from '../styles/styles';

export default function AddTaskScreen({ navigation }: any) {

  const [task, setTask] = useState<string>('');

  const saveTask = async () => {

    if (task === '') {

      Alert.alert('Escribir una tarea');

      return;
    }

    const savedTasks =
      await AsyncStorage.getItem('tasks');

    let tasks: string[] = [];

    if (savedTasks) {

      tasks = JSON.parse(savedTasks);

    }

    tasks.push(task);

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(tasks)
    );

    await Notifications.scheduleNotificationAsync({

      content: {

        title: 'Nueva tarea',

        body: task,

      },

      trigger: {
        seconds: 5,
      } as any,

    });

    Alert.alert('Tarea guardada');

    navigation.navigate('Home');
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        NUEVA TAREA
      </Text>

      <TextInput
        placeholder="Escribir tarea"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />

      <Button
        title="Guardar"
        onPress={saveTask}
      />

    </View>
  );
}