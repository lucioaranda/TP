import React from 'react';

import {
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';

import { styles } from '../styles/styles';

export default function TaskItem({
  item,
  onDelete,
  onSelectImage,
}: any) {
  return (
    <View style={styles.taskCard}>

      {item.location && (
        <View style={styles.fakeMap}>
          <View style={styles.mapGridLineHorizontal} />
          <View style={styles.mapGridLineVertical} />

          <View style={styles.mapMarker}>
            <Text style={styles.mapMarkerText}>
              📍
            </Text>
          </View>

          <View style={styles.mapCoordinatesBox}>
            <Text style={styles.mapCoordinatesText}>
              Lat: {item.location.latitude.toFixed(4)}
            </Text>

            <Text style={styles.mapCoordinatesText}>
              Long: {item.location.longitude.toFixed(4)}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.taskItemRow}>
        <Pressable
          style={styles.imageCircleSmall}
          onPress={onSelectImage}
        >
          {item.imageUri ? (
            <Image
              source={{ uri: item.imageUri }}
              style={styles.taskImageSmall}
            />
          ) : (
            <Text style={styles.imagePlusSmall}>
              +
            </Text>
          )}
        </Pressable>

        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>
            {item.title}
          </Text>

          <Text style={styles.taskDate}>
            {item.date}
          </Text>
        </View>
      </View>

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