import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
        flexGrow: 1
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
        marginRight:  40, 
        color: "#fff", 
        fontSize: 17, 
        fontWeight: "bold"
    },
    titulo: {
        fontWeight: "bold", 
        fontSize: 20, 
        margin: 15
    },
    botaoResultado: {
        width: "80%",
        height: 80, 
        backgroundColor: "#ececec", 
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
        minWidth: "100%"
    },
    input:{
        backgroundColor: "#ddd",
        width: 50,
        height: 30,
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 5
    },
    subtitulo:{
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center"
    },
    espacoPresente:{
        backgroundColor: "#eaeaea",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
    },
    containerEspacoPresente: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    resultado: {
        fontSize: 60
    },
    containeResultado:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    containerEspacoRequerido:{
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        marginBottom: 10
    }
   
   
})