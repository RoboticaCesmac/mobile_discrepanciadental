import { StatusBar } from 'expo-status-bar';
import { SafeAreaView ,StyleSheet, Button, TextInput, ImageBackground, Pressable , Text, View } from 'react-native';
import  Logo  from '../../../assets/svgs/Logo.svg';
import  SigninButton  from '../../../assets/svgs/SigninButton.svg';

//fonts
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        height: "80%", width: "80%",
        borderRadius: 15,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5%"
    },
    input: {
        backgroundColor: "#357180",
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    header: {
        fontSize: 32,
        fontFamily: 'Ubuntu-Regular',
    },
    btnSignup:{
        color: "red",
    }

});

export default function LoginScreen() {
    let [fontsLoaded] = useFonts({
        'Ubuntu-Regular': require('../../../assets/fonts/Ubuntu-Regular.ttf')
    });

    if(!fontsLoaded) {
        return <AppLoading />;
    }

  return (
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                   <View style={styles.container}>
                       <View style={styles.card}>
                           <Logo width={123} height={124}/>
                           <Text style={[styles.header, { fontFamily: "Ubuntu-Regular" }]}>Seja Bem Vindo</Text>
                           <TextInput placeholder='E-mail' style={styles.input}></TextInput>
                           <TextInput placeholder='Senha' style={styles.input}></TextInput>
                           <SigninButton width={43} height={41}/>

                       </View>
                   </View>
                </SafeAreaView>

  );
}