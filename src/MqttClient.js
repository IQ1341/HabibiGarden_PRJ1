import { Client, Message } from 'paho-mqtt';

const broker = 'ws://test.mosquitto.org:8080/mqtt'; // WebSocket broker URL

class MqttClient {
  constructor() {
    this.client = new Client(broker, 'clientId-' + Math.random().toString(16).substr(2, 8));
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.isConnected = false; // Track connection state
  }

  connect() {
    const options = {
      onSuccess: this.onConnect.bind(this),
      onFailure: this.onFailure.bind(this),
      userName: '',
      password: '',
      useSSL: false
    };
    this.client.connect(options);
  }

  onConnect() {
    console.log('Connected to MQTT broker');
    this.isConnected = true;
    this.client.subscribe('Hsensor/temperature'); // Subscribe to temperature topic
    this.client.subscribe('Hsensor/humidity'); // Subscribe to humidity topic
  }

  onFailure(error) {
    console.error('Failed to connect:', error.errorMessage);
    console.error('Error details:', error);
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.error('Connection lost:', responseObject.errorMessage);
      console.error('Response details:', responseObject);
    }
    this.isConnected = false;
  }

  onMessageArrived(message) {
    console.log('Message arrived:', message.payloadString);
    if (this.onMessageReceived) this.onMessageReceived(message.destinationName, message.payloadString);
  }

  publish(topic, message) {
    if (this.isConnected) {
      const mqttMessage = new Message(message);
      mqttMessage.destinationName = topic;
      this.client.send(mqttMessage);
    } else {
      console.error('Cannot publish, MQTT client is not connected');
    }
  }
}

export default new MqttClient();
