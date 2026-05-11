import React from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { styles } from '../styles/styles';

export default function TaskItem({ item, onDelete }: any) {

  return (

    <View style={styles.taskCard}>

      <Text style={styles.taskTitle}>
        {item.title}
      </Text>

      <Text style={styles.taskDate}>
        {item.date}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={onDelete}
      >

        <Text style={styles.buttonText}>
          Eliminar
        </Text>

      </Pressable>

    </View>
  );
}