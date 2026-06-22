import React, { useEffect, useState } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';

import { styles } from './styles/styles';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function UserMenu({ navigation }: any) {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await AsyncStorage.removeItem('session');
    setOpen(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.userMenuContainer}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.userIcon}>👤</Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setOpen(false)}
        >
          <View style={styles.logoutBox}>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logoutText}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.headerHelpButton}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.headerHelpButtonText}>
          Ayuda
        </Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>
              Soporte
            </Text>

            <Text style={styles.helpText}>
              Para obtener ayuda comuníquese con el mail de soporte:
            </Text>

            <Text style={styles.helpMail}>
              Soporte@gmail.com
            </Text>

            <TouchableOpacity
              style={styles.helpCloseButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.helpCloseButtonText}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
    createNotificationChannel();
    checkSession();
  }, []);

  const requestPermissions = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const createNotificationChannel = async () => {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2563EB',
    });
  };

  const checkSession = async () => {
    const session = await AsyncStorage.getItem('session');

    if (session === 'true') {
      setInitialRoute('Home');
    } else {
      setInitialRoute('Login');
    }
  };

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Registro',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'TAREAS',

            headerLeft: () => (
              <UserMenu navigation={navigation} />
            ),

            headerRight: () => (
              <HelpButton />
            ),

            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleStyle,
          })}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            title: 'Nueva tarea',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}