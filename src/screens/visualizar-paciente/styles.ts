import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
        minWidth: "100%",
        paddingBottom: 80
    },
    header: {
        backgroundColor: "#65a194", 
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
        width: "90%",
        height: 50, 
        backgroundColor: "#f0f0f0", 
        borderRadius: 10, 
        marginTop: 10, 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        alignSelf: "center",
        flexDirection: "row"
    },
    textoBotaoNovoResultado: {
        fontWeight: "bold", 
        color: "#fff", 
        marginHorizontal: 5
    },
    botaoNovoResultado: {
        backgroundColor: "#65a194", 
        padding: 10, 
        borderRadius: 50, 
        position: "absolute", 
        bottom: 20
    },
    listaResultados: {
        alignItems: 'center',
        flex: 1,
    },
    cardDados:{
        backgroundColor: "#f0f0f0", 
        justifyContent: "space-evenly", 
        // alignItems: "center", 
        padding: 20, 
        borderRadius: 10, 
        marginTop: 20, 
        height: 130,

        width: "73%",
   
    },
    cardResultados:{
        backgroundColor: "#f0f0f0", 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        padding: 20, 
        width: "90%",
        margin: 10,
        marginBottom: 80,
        flex: 1,
        borderRadius: 10, 
        marginTop: 20, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
   
   
})