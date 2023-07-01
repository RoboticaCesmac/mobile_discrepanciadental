import { StyleSheet } from "react-native";
import { background, primaria } from "../../themes/cores";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: background,
        justifyContent: "center",
        alignContent: "center"
    },
    container: {
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        flexGrow: 1
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

    textoBotaoNovoResultado: {
        fontWeight: "bold", 
        color: "#fff", 
        marginHorizontal: 5
    },
    botaoNovoResultado: {
        backgroundColor: primaria, 
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
    tituloPicker:{
        fontSize: 15,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#65a194',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
   
   
})