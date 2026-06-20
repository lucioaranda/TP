import { Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as Calendar from 'expo-calendar';
import { Camera } from 'expo-camera';

export type PermissionStatus = 'concedido' | 'denegado' | 'pendiente';

const showDeniedAlert = (resource: string) => {
  Alert.alert(
    'Permiso denegado',
    `No se concedió el permiso para acceder a ${resource}. Podés habilitarlo desde la configuración del dispositivo.`
  );
};

export const requestCameraPermission = async (): Promise<PermissionStatus> => {
  const { status } = await Camera.requestCameraPermissionsAsync();

  if (status === 'granted') {
    return 'concedido';
  }

  showDeniedAlert('la cámara');
  return 'denegado';
};

export const requestGalleryPermission = async (): Promise<PermissionStatus> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status === 'granted') {
    return 'concedido';
  }

  showDeniedAlert('la galería');
  return 'denegado';
};

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status === 'granted') {
    return 'concedido';
  }

  showDeniedAlert('la ubicación');
  return 'denegado';
};

export const requestContactsPermission = async (): Promise<PermissionStatus> => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status === 'granted') {
    return 'concedido';
  }

  showDeniedAlert('los contactos');
  return 'denegado';
};

export const requestCalendarPermission = async (): Promise<PermissionStatus> => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();

  if (status === 'granted') {
    return 'concedido';
  }

  showDeniedAlert('el calendario');
  return 'denegado';
};