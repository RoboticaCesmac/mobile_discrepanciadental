import { StyleSheet, Text, View } from "react-native";


export default function Tela1Screen(props: any) {

    return (

        <View style={styles.container}>

            <Text style={styles.text}>Tela 1</Text>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
     text: {
         fontSize: 32
     }

});