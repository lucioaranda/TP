import React from 'react';

import {
  Pressable,
  Text,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function TestButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
}