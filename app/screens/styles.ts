import { StyleSheet } from 'react-native';

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
        fontSize: 32,
        marginBottom: 10
    },
    input: {
        backgroundColor: "#eeeee4",
        width: 343,
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
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

});

export default styles;