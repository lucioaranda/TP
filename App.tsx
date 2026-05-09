import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {

    requestPermissions();

    Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance:
          Notifications.AndroidImportance.MAX,
      }
    );

  }, []);

  const requestPermissions = async () => {

    await Notifications.requestPermissionsAsync();

  };

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}