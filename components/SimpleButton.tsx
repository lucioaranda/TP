import React from 'react';

import {
  Text,
  TouchableOpacity,
} from 'react-native';

export default function SimpleButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: any) {
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}