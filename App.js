import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MqttClient from './src/MqttClient'; // Adjust path as necessary

const { width } = Dimensions.get('window'); // Get screen width

const App = () => {
  const [temperature, setTemperature] = useState('25 °C'); // Set initial temperature
  const [humidity, setHumidity] = useState('50 %'); // Set initial humidity
  const [fanStatuses, setFanStatuses] = useState(['OFF', 'OFF', 'OFF']); // Initial fan statuses
  const [lightStatuses, setLightStatuses] = useState(['OFF', 'OFF', 'OFF']); // Initial light statuses

  useEffect(() => {
    // Simulating MQTT message reception for demo
    const simulateMqttMessage = () => {
      setTemperature('25 °C');
      setHumidity('50 %');
    };

    simulateMqttMessage();

    // Here we should establish the actual connection and handle real messages
    MqttClient.onMessageReceived = (topic, message) => {
      if (topic === 'Hsensor/temperature') {
        setTemperature(`${message} °C`);
      } else if (topic === 'Hsensor/humidity') {
        setHumidity(`${message} %`);
      }
    };

    MqttClient.connect();

    return () => {
      MqttClient.client.disconnect(); // Disconnect on component unmount
    };
  }, []);

  // Function to handle button presses
  const handleButtonPress = (type, index) => {
    if (type === 'fan') {
      const newStatuses = [...fanStatuses];
      newStatuses[index] = newStatuses[index] === 'OFF' ? 'ON' : 'OFF';
      setFanStatuses(newStatuses);
      MqttClient.publish(`RelayControl/fan${index + 1}`, newStatuses[index]); // Send MQTT message
    } else if (type === 'light') {
      const newStatuses = [...lightStatuses];
      newStatuses[index] = newStatuses[index] === 'OFF' ? 'ON' : 'OFF';
      setLightStatuses(newStatuses);
      MqttClient.publish(`RelayControl/light${index + 1}`, newStatuses[index]); // Send MQTT message
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.navbar}>
        <View style={styles.leftNavbar}>
          <Image
            source={require('./assets/5.png')} // Path to your logo image
            style={styles.logo}
          />
          <Text style={styles.navbarText}>MuhammadIqbal</Text>
        </View>
        <Image
          source={require('./assets/4.png')} // Path to your search icon image
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataCard}>
          <Image
            source={require('./assets/3.png')}
            style={styles.icon}
          />
          <Text style={styles.dataTitle}>Humidity</Text>
          <Text style={styles.dataValue}>{humidity}</Text>
        </View>
        <View style={styles.dataCard}>
          <Image source={require('./assets/2.png')} style={styles.icon} />
          <Text style={styles.dataTitle}>Temperature</Text>
          <Text style={styles.dataValue}>{temperature}</Text>
        </View>
      </View>
      <View style={styles.controlContainer}>
        <Text style={styles.controlTitle}>Control Fan</Text>
        <View style={styles.buttonContainer}>
          {fanStatuses.map((status, index) => (
            <TouchableOpacity
              key={`fan${index + 1}`}
              style={styles.button}
              onPress={() => handleButtonPress('fan', index)}
            >
              <Image
                source={status === 'ON' ? require('./assets/6.png') : require('./assets/7.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.controlTitle}>Control Light</Text>
        <View style={styles.buttonContainer}>
          {lightStatuses.map((status, index) => (
            <TouchableOpacity
              key={`light${index + 1}`}
              style={styles.button}
              onPress={() => handleButtonPress('light', index)}
            >
              <Image
                source={status === 'ON' ? require('./assets/8.png') : require('./assets/9.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for the whole app
    padding: 10,
  },
  navbar: {
    flexDirection: 'row', // Align logo, text, and icon horizontally
    justifyContent: 'space-between', // Space between left and right elements
    alignItems: 'center', // Center vertically
    padding: 15, // Add padding inside the navbar
    borderBottomWidth: 2, // Border width
    borderBottomColor: '#4a90e2', // Border color
    marginBottom: 20,
  },
  leftNavbar: {
    flexDirection: 'row', // Align logo and text horizontally
    alignItems: 'center',
  },
  logo: {
    width: 40, // Adjust size of the logo
    height: 40,
    marginRight: 10, // Space between logo and text
  },
  navbarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark color for text in navbar
  },
  searchIcon: {
    width: 30, // Adjust size of the search icon
    height: 30,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dataCard: {

    borderRadius: 12,
    padding: 15,
    width: width * 0.4, // Slightly smaller card width
    alignItems: 'center',
    shadowColor: '#000',
    
    borderColor: '#4a90e2', // Light border color
    borderWidth: 1,
    marginHorizontal: 10, // Add margin between cards
  },
  icon: {
    width: 80, // Adjust width to make image larger
    height: 80, // Adjust height to make image larger
    marginBottom: 10,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333', // Dark color for titles
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Dark color for values
  },
  controlContainer: {
    marginTop: 30,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    flexWrap: 'wrap', // Allow buttons to wrap to the next line
    justifyContent: 'space-between', // Space between buttons
    padding: 10, // Reduced padding
  },
  button: {
    backgroundColor: '#f0f0f0', // Light background for buttons
    borderRadius: 8,
    padding: 10, // Reduced padding
    width: width * 0.25, // Smaller button width
    alignItems: 'center',
    marginBottom: 10, // Add margin below each button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Reduced elevation for Android shadow
  },
});

export default App;