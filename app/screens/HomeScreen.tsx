import { Alert, Button, SafeAreaView, Text } from "react-native"
import { signOut } from 'firebase/auth';

import { auth } from '@config/firebase';
import styles from "./styles"

const HomeScreen = ({navigation}) =>{
    var name = auth.currentUser?.email;
    const logout = async () => {
        try {
            await signOut(auth);
        } catch(e) {
            Alert.alert('Ocorreu um erro', JSON.stringify(e))
        } finally {
            navigation.navigate('Authentication');
        }
    }
    
    return(
        <SafeAreaView style={{ flex: 1, alignItems:'center', backgroundColor: "white" }}>
            <Text style={styles.header}>{name}</Text>
            <Button title="Log out" onPress={logout} />
            <Button title="Go Back" onPress={() => navigation.navigate('Authentication')} />
        </SafeAreaView>
    )
}

export { HomeScreen };