/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  function getGeolocation() {
    console.log('Getting current position...');
    Geolocation.getCurrentPosition(info => console.log(info));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button title="Get Location" onPress={getGeolocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
