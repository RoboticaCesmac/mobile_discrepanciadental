import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%", 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center"
    },
    card: {
        backgroundColor: "#00000033", 
        height: "50%", width: "80%", 
        borderRadius: 15, 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        padding: "5%"
    },
    input: {
        backgroundColor: "#fff", 
        width: "100%", 
        height: 50, 
        paddingHorizontal: 20, 
        borderRadius: 10
    },
    titulo: {
        fontSize: 50
    }

});

export default styles;