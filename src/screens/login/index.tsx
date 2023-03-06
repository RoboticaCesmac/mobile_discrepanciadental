import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, ImageBackground, Text, View } from 'react-native';

import styles from './styles';

export default function TelaLogin() {
    const nome = "Tal";

  return (

        <ImageBackground source = {
            require("./../../../assets/imagens/bg.png")}  style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Login</Text>
                <TextInput placeholder='E-mail' style={styles.input}></TextInput>
                <TextInput placeholder='Senha' style={styles.input}></TextInput>
                <Button title='Logar'/>
            </View>
            <StatusBar style="auto" /> 
        </ImageBackground>

  );
}