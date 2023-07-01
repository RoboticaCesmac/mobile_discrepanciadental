import { Dimensions, StyleSheet } from 'react-native';
import { primaria } from '../../themes/cores';

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    textoHeader: {
        flex: 1, textAlign: "center", 
        marginRight:  40, 
        color: "#fff", 
        fontSize: 17, 
        fontWeight: "bold"
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    logo:{
        width: 100,
        height: 100,
        position: 'absolute',
        top: 70,
    },
    card: {
        height: "80%", width: "100%",
        borderRadius: 15,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5%",
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
    input: {
        backgroundColor: "#eeeee4",
        width: Dimensions.get('window').width - 100,
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        // borderWidth: 5,
        // borderStyle: "solid",
        // borderColor: "orange",
    },
    submitButton:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#357180',
        borderWidth:  1,
        borderStyle:  'solid',
        borderRadius: 10,
        marginTop: 20,
        width: 343,
        height: 54,
    },
    submitButtonText:{
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },
    fail:{
        color: 'white',
        borderRadius: 5,
        minHeight: 20,
        backgroundColor: '#FF0000',
        paddingTop: 8,
    },
    textName: {
        fontSize: 15,
        fontWeight: '700',
      },
    flatList: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    btnLoadResults: {
        height: 70,
        width: 70,
        borderRadius: 20,
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "#00ff00",
        padding: 20,
        alignSelf:'flex-end'
    },
    wrapperIconTextBtnLoadResults:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor:'#D9D9D9',
        borderRadius: 10,
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "#ff0000",
        width: "85%",
        marginBottom: 10,
    },
    wrapperText:{
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "center",
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "#ffff00",
        height: 70,
        width: Dimensions.get("window").width / 3
    }
});

export default styles;