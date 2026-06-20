import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';

import TaskItem from '../components/TaskItem';

import { styles } from '../styles/styles';

import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../utils/Permissions';

type Task = {
  id: string;
  title: string;
  date: string;
  notificationId: string;
  imageUri?: string;
  location?: {
  latitude: number;
  longitude: number;
};
};

export default function HomeScreen({ navigation }: any) {

  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    );
  };

  const deleteTask = async (taskId: string) => {
    const taskToDelete = tasks.find(
      item => item.id === taskId
    );

    if (taskToDelete?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        taskToDelete.notificationId
      );
    }

    const newTasks = tasks.filter(
      item => item.id !== taskId
    );

    await saveTasks(newTasks);
  };

  const selectImageOption = (taskId: string) => {
    Alert.alert(
      'Agregar imagen',
      'Seleccioná una opción',
      [
        {
          text: 'Tomar foto',
          onPress: () => openCamera(taskId),
        },
        {
          text: 'Elegir de galería',
          onPress: () => openGallery(taskId),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async (taskId: string) => {
    const permission = await requestCameraPermission();

    if (permission !== 'concedido') {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      updateTaskImage(taskId, result.assets[0].uri);
    }
  };

  const openGallery = async (taskId: string) => {
    const permission = await requestGalleryPermission();

    if (permission !== 'concedido') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      updateTaskImage(taskId, result.assets[0].uri);
    }
  };

  const updateTaskImage = async (
    taskId: string,
    imageUri: string
  ) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          imageUri,
        };
      }

      return task;
    });

    await saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Mis Tareas
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.buttonText}>
          Agregar tarea
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={{
              ...item,
              date: new Date(item.date).toLocaleString(),
            }}
            onDelete={() => deleteTask(item.id)}
            onSelectImage={() => selectImageOption(item.id)}
          />
        )}
      />

    </View>
  );
}