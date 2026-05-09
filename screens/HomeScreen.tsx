import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';

import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }: any) {

  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks = async () => {

    const savedTasks =
      await AsyncStorage.getItem('tasks');

    if (savedTasks) {

      setTasks(JSON.parse(savedTasks));

    }
  };

  const deleteTask = async (index: number) => {

    const newTasks = tasks.filter(
      (item, i) => i !== index
    );

    setTasks(newTasks);

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        MIS TAREAS
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

        keyExtractor={(item, index) =>
          index.toString()
        }

        renderItem={({ item, index }) => (

          <TaskItem
            item={item}
            onDelete={() => deleteTask(index)}
          />

        )}
      />

    </View>
  );
}