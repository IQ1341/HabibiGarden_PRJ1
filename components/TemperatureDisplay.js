import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function TemperatureDisplay({ temperature }) {
  return (
    <View style={styles.tempDisplay}>
      <Text style={styles.tempText}>Current Temperature: {temperature}°C</Text>
    </View>
  );
}
