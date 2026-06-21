import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';

import { styles } from '../styles/styles';

import {
  requestCameraPermission,
  requestGalleryPermission,
  requestLocationPermission,
  requestContactsPermission,
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
  responsible?: {
    name: string;
    phone?: string;
    email?: string;
  };
};

export default function AddTaskScreen({ navigation }: any) {
  const [task, setTask] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [responsible, setResponsible] = useState<{
    name: string;
    phone?: string;
    email?: string;
  } | null>(null);

  const openDatePicker = () => {
    setPickerMode('date');
    setShowPicker(true);
  };

  const selectImageOption = () => {
    Alert.alert(
      'Agregar imagen',
      'Seleccioná una opción',
      [
        {
          text: 'Tomar foto',
          onPress: openCamera,
        },
        {
          text: 'Elegir de galería',
          onPress: openGallery,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const getCurrentLocation = async () => {
    const permission = await requestLocationPermission();

    if (permission !== 'concedido') {
      return;
    }

    try {
      const currentLocation = {
        coords: {
          latitude: -34.6037,
          longitude: -58.3816,
        },
      };

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      Alert.alert('Ubicación agregada');
    } catch (error) {
      console.log('Error al obtener ubicación:', error);
      Alert.alert('No se pudo obtener la ubicación actual');
    }
  };

  const selectResponsible = async () => {
    const permission = await requestContactsPermission();

    if (permission !== 'concedido') {
      return;
    }

    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails,
        ],
      });

      if (data.length === 0) {
        Alert.alert('No hay contactos disponibles');
        return;
      }

      const firstContact = data[0];

      setResponsible({
        name: firstContact.name,
        phone: firstContact.phoneNumbers?.[0]?.number,
        email: firstContact.emails?.[0]?.email,
      });

      Alert.alert(
        'Responsable seleccionado',
        firstContact.name
      );

    } catch (error) {
      console.log('Error al obtener contactos:', error);
      Alert.alert('No se pudo obtener la lista de contactos');
    }
  };

  const saveTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Escribir una tarea');
      return;
    }

    if (!date) {
      Alert.alert('Seleccionar fecha y hora para el recordatorio');
      return;
    }

    const now = new Date();

    if (date.getTime() <= now.getTime()) {
      Alert.alert(
        'La fecha y hora del recordatorio deben ser posteriores a la actual'
      );
      return;
    }

    try {
      const savedTasks = await AsyncStorage.getItem('tasks');

      let tasks: Task[] = [];

      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
      }

      const notificationId =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Recordatorio de tarea',
            body: `Tenés pendiente: ${task}`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: date,
            channelId: 'default',
          },
        });

      const newTask: Task = {
        id: Date.now().toString(),
        title: task,
        date: date.toISOString(),
        notificationId,
        imageUri: imageUri || undefined,
        location: location || undefined,
        responsible: responsible || undefined,
      };

      tasks.push(newTask);

      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
      );

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
      setDate(null);
      setImageUri(null);
      setLocation(null);
      setResponsible(null);

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

      <View style={styles.taskInputRow}>
        <TouchableOpacity
          style={styles.imageCircle}
          onPress={selectImageOption}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.taskImage}
            />
          ) : (
            <Text style={styles.imagePlus}>
              +
            </Text>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Escribir tarea"
          style={[styles.input, styles.taskInput]}
          value={task}
          onChangeText={setTask}
        />
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={selectResponsible}
      >
        <Text style={styles.contactButtonText}>
          {responsible
            ? `Responsable: ${responsible.name}`
            : 'Seleccionar responsable'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <Text style={styles.locationButtonText}>
          {location
            ? 'Ubicación agregada'
            : 'Agregar ubicación actual'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={openDatePicker}
      >
        <Text style={styles.datePickerText}>
          {date
            ? date.toLocaleString()
            : 'Seleccionar fecha y hora'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode={pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);

            if (!selectedDate) {
              return;
            }

            if (pickerMode === 'date') {
              const newDate = new Date(selectedDate);

              newDate.setHours(0);
              newDate.setMinutes(0);
              newDate.setSeconds(0);
              newDate.setMilliseconds(0);

              setDate(newDate);

              setTimeout(() => {
                setPickerMode('time');
                setShowPicker(true);
              }, 300);

            } else {

              const selectedDay = date || new Date();

              const finalDate = new Date(selectedDay);

              finalDate.setHours(
                selectedDate.getHours()
              );

              finalDate.setMinutes(
                selectedDate.getMinutes()
              );

              finalDate.setSeconds(0);
              finalDate.setMilliseconds(0);

              setDate(finalDate);
            }
          }}
        />
      )}

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