import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#2E7D32',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempDisplay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    borderColor: '#2E7D32',
    borderWidth: 2,
  },
  tempText: {
    fontSize: 22,
    color: '#2E7D32',
  },
  lampControl: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    borderColor: '#2E7D32',
    borderWidth: 2,
  },
  lampText: {
    fontSize: 22,
    color: '#2E7D32',
    marginBottom: 10,
  },
  lampStatus: {
    marginTop: 10,
    fontSize: 18,
    color: '#2E7D32',
  },
});
