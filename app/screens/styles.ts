import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
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
        marginBottom: 10,
        marginTop: 10,
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
    fail:{
        color: 'white',
        borderRadius: 5,
        minHeight: 20,
        backgroundColor: '#FF0000',
        paddingTop: 8,
    },
    errorBorder:{
        backgroundColor: "#eeeee4",
        width: 343,
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderStyle:  'solid',
        borderColor: '#ff9494'
    },
    successBorder:{
        backgroundColor: "#eeeee4",
        width: 343,
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderStyle:  'solid',
        borderColor: '#4bb543',
    },
    success: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: 12,
        padding:2,
        borderRadius: 2,
        marginBottom: 10
    },
    error: {
        backgroundColor: '#ff9494',
        color: 'white',
        fontSize: 12,
        padding:2,
        borderRadius: 2,
        marginBottom: 30
    },
    textName: {
        fontSize: 15,
        fontWeight: '700',
      },
    flatList: {
        justifyContent: "flex-start",
        flexDirection: "column",
        alignContent: 'space-between',
        alignItems: "center",
        width: Dimensions.get("window").width - 120,
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
        justifyContent: "space-around",
        backgroundColor:'#D9D9D9',
        borderRadius: 10,
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "#ff0000",
        width: Dimensions.get("window").width - 120,
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