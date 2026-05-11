import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import { styles } from '../styles/styles';

export default function AddTaskScreen({ navigation }: any) {
  const [task, setTask] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const saveTask = async () => {
    if (task === '') {
      Alert.alert('Escribir una tarea');
      return;
    }

    try {
      const savedTasks = await AsyncStorage.getItem('tasks');

      let tasks: { title: string; date: string }[] = [];

      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
      }

      const newTask = {
        title: task,
        date: date === '' ? 'Sin fecha' : date,
      };

      tasks.push(newTask);

      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
      );

      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Recordatorio de tarea',
            body: `Tenés pendiente: ${task}`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 5,
            channelId: 'default',
          } as any,
        });
      } catch (notificationError) {
        console.log('Error en notificación:', notificationError);
      }

      Alert.alert(
        'Tarea guardada',
        'La tarea se agregó correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );

      setTask('');
      setDate('');

    } catch (error) {
      console.log('Error al guardar tarea:', error);
      Alert.alert('Error al guardar la tarea');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Agregar tarea
      </Text>

      <TextInput
        placeholder="Escribir tarea"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />

      <TextInput
        placeholder="Fecha o recordatorio"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveTask}
      >
        <Text style={styles.buttonText}>
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
}