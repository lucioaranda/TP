import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';

import { styles } from '../styles/styles';
import SimpleButton from '../components/SimpleButton';

import {
  requestCameraPermission,
  requestGalleryPermission,
  requestLocationPermission,
  requestContactsPermission,
} from '../utils/Permissions';

type Responsible = {
  name: string;
  phone?: string;
  email?: string;
};

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
  responsible?: Responsible;
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

  const [responsible, setResponsible] = useState<Responsible | null>(null);
  const [contacts, setContacts] = useState<Responsible[]>([]);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);

  const openDatePicker = () => {
    setPickerMode('date');
    setShowPicker(true);
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

      const formattedContacts = data
        .filter(contact => contact.name)
        .map(contact => ({
          name: contact.name,
          phone: contact.phoneNumbers?.[0]?.number,
          email: contact.emails?.[0]?.email,
        }));

      if (formattedContacts.length === 0) {
        Alert.alert('No hay contactos disponibles');
        return;
      }

      setContacts(formattedContacts);
      setContactsModalVisible(true);

    } catch (error) {
      console.log('Error al obtener contactos:', error);
      Alert.alert('No se pudo obtener la lista de contactos');
    }
  };

  const chooseResponsible = (contact: Responsible) => {
    setResponsible(contact);
    setContactsModalVisible(false);
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

      <SimpleButton
        title={
          responsible
            ? `Responsable: ${responsible.name}`
            : 'Seleccionar responsable'
        }
        onPress={selectResponsible}
        buttonStyle={styles.contactButton}
        textStyle={styles.contactButtonText}
      />

      <SimpleButton
        title={
          location
            ? 'Ubicación agregada'
            : 'Agregar ubicación actual'
        }
        onPress={getCurrentLocation}
        buttonStyle={styles.locationButton}
        textStyle={styles.locationButtonText}
      />

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

              finalDate.setHours(selectedDate.getHours());
              finalDate.setMinutes(selectedDate.getMinutes());
              finalDate.setSeconds(0);
              finalDate.setMilliseconds(0);

              setDate(finalDate);
            }
          }}
        />
      )}

      <SimpleButton
        title="Guardar"
        onPress={saveTask}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />

      <Modal
        visible={contactsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setContactsModalVisible(false)}
      >
        <View style={styles.contactModalBackground}>
          <View style={styles.contactModalBox}>
            <Text style={styles.contactModalTitle}>
              Seleccionar responsable
            </Text>

            <FlatList
              data={contacts}
              keyExtractor={(item, index) =>
                `${item.name}-${index}`
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => chooseResponsible(item)}
                >
                  <Text style={styles.contactName}>
                    {item.name}
                  </Text>

                  {item.phone && (
                    <Text style={styles.contactDetail}>
                      {item.phone}
                    </Text>
                  )}

                  {item.email && (
                    <Text style={styles.contactDetail}>
                      {item.email}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />

            <SimpleButton
              title="Cerrar"
              onPress={() => setContactsModalVisible(false)}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}