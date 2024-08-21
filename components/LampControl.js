import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
import MqttClient from './components/MqttClient'; // Import class MqttClient yang sudah Anda buat

export default function LampControl() {
  const [isLampOn, setIsLampOn] = useState(false);
  const [inputText, setInputText] = useState('');
  const [mqttClient, setMqttClient] = useState(null);

  useEffect(() => {
    // Inisialisasi dan koneksi MQTT
    const client = MqttClient;
    client.onTempUpdate = (temp) => {
      console.log('Temperature updated:', temp);
    };
    client.connect();
    setMqttClient(client);

    // Cleanup saat komponen unmount
    return () => {
      if (mqttClient) {
        mqttClient.client.disconnect();
      }
    };
  }, []);

  const toggleSwitch = () => {
    const newState = !isLampOn;
    setIsLampOn(newState);

    // Mengirim status lampu ke MQTT
    mqttClient.publish('home/greenhouse/lamp', newState ? 'ON' : 'OFF');
  };

  const sendMessage = () => {
    // Mengirim pesan dari input text ke MQTT
    mqttClient.publish('home/greenhouse/input', inputText);
    setInputText(''); // Clear input text setelah mengirim
  };

  return (
    <View style={styles.container}>
      <Text style={styles.lampText}>Lamp Control</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isLampOn ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLampOn}
      />
      <Text style={styles.lampStatus}>
        {isLampOn ? 'Lamp is ON' : 'Lamp is OFF'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter message"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  lampText: {
    fontSize: 24,
    marginBottom: 16,
  },
  lampStatus: {
    fontSize: 18,
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
});
