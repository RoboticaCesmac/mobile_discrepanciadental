import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./src/screens/login";
import MainNavigation from './src/navigations';
import 'react-native-gesture-handler';

export default function App() {
    return (
       <MainNavigation/>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
