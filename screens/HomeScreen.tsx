import React, { useCallback } from 'react';

import {
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';


import TaskItem from '../components/TaskItem';
import SimpleButton from '../components/SimpleButton';

import { styles } from '../styles/styles';

import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../utils/Permissions';

import { useTaskStore } from '../store/taskStore';

export default function HomeScreen({ navigation }: any) {
  const tasks = useTaskStore(state => state.tasks);

  const loadTasks = useTaskStore.getState().loadTasks;
  const deleteTaskFromStore = useTaskStore.getState().deleteTask;
  const updateTaskImageInStore = useTaskStore.getState().updateTaskImage;

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const deleteTask = async (taskId: string) => {
    const taskToDelete = tasks.find(
      item => item.id === taskId
    );

    if (taskToDelete?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        taskToDelete.notificationId
      );
    }

    await deleteTaskFromStore(taskId);
  };

  const updateTaskImage = async (
    taskId: string,
    imageUri: string
  ) => {
    await updateTaskImageInStore(taskId, imageUri);
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
      await updateTaskImage(taskId, result.assets[0].uri);
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
      await updateTaskImage(taskId, result.assets[0].uri);
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mis Tareas
      </Text>

      <SimpleButton
        title="Agregar tarea"
        onPress={() => navigation.navigate('AddTask')}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />

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