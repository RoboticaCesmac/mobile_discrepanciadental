import { Dimensions, StyleSheet } from 'react-native';
import { background } from '../../themes/cores';

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: background,
    },
    formContainer: {
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
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 20,
        marginTop: 50,
        width: Dimensions.get('window').width,
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
        fontSize: 16
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
    botaoPaciente:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor:'#D9D9D9',
        borderRadius: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.83
    },
    wrapperText:{
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "center",
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "#ffff00",
        height: 70,
    }
});

export default styles;