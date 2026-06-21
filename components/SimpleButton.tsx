import React from 'react';

import {
  Pressable,
  Text,
} from 'react-native';

export default function SimpleButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: any) {
  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>
        {title}
      </Text>
    </Pressable>
  );
}