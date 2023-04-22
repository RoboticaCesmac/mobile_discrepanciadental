import { SafeAreaView, Text } from "react-native"
import styles from "./styles"

const HomeScreen = () =>{
    return(
        <SafeAreaView style={{ flex: 1, alignItems:'center', backgroundColor: "white" }}>
            <Text style={styles.header}>Lista de Pacientes</Text>
        </SafeAreaView>
    )
}

export { HomeScreen };