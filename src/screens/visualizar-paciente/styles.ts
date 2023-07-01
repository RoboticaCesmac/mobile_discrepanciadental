import { StyleSheet } from "react-native";
import { background, primaria } from "../../themes/cores";

export const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        minWidth: "100%",
        maxHeight: "100%",
        flex: 1
    },
    header: {
        backgroundColor: primaria, 
        width: "100%", 
        height: 100, 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "row", 
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textoHeader: {
        flex: 1, textAlign: "center", 
        marginRight:  10, 
        color: "#fff", 
        fontSize: 17, 
        fontWeight: "bold"
    },
    tituloResultados: {
        marginTop: 40,
        fontWeight: "bold", 
        fontSize: 20, 
        marginBottom: 20
    },
    botaoResultado: {
        padding: 15,
        minWidth: "100%",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    listaResultados: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flex: 1,
        minWidth: "90%"
    },
    textoBotaoNovoResultado: {
        fontWeight: "bold", 
        color: "#fff", 
        marginHorizontal: 5,
        
    },
    botaoNovoResultado: {
        backgroundColor: primaria, 
        padding: 10, 
        borderRadius: 50, 
        position: "absolute", 
        bottom: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    
    cardDados:{
        backgroundColor: "#f0f0f0", 
        justifyContent: "space-evenly", 
        // alignItems: "center", 
        padding: 20, 
        borderRadius: 10, 
        marginTop: 20, 
        width: "73%",
   
    },
})