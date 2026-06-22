import React from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

import { styles } from '../styles/styles';

export default function TestButton({
  title,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={styles.headerTestButton}
      onPress={onPress}
    >
      <Text style={styles.headerTestButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}