import React, { useEffect, useState } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

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
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function UserMenu({ navigation }: any) {
  const [open, setOpen] = useState(false);

  const logout = () => {
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

export default function App() {
  useEffect(() => {
    requestPermissions();
    createNotificationChannel();
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
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