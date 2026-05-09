import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { styles } from '../styles/styles';

export default function TaskItem({ item, onDelete }: any) {

  return (

    <View style={styles.taskCard}>

      <Text style={styles.taskText}>
        {item}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >

        <Text style={styles.buttonText}>
          Eliminar
        </Text>

      </TouchableOpacity>

    </View>
  );
}