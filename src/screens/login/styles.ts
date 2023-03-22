import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
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
        fontFamily: 'Ubuntu-Regular',
        marginBottom: 10
    },
    input: {
        backgroundColor: "#eeeee4",
        width: 343,
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,

    },
    btnSignup:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'fff',
        borderWidth:  1,
        borderStyle:  'solid',
        marginTop: 20,
        width: 138,
        height: 28
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
        borderColor: '#FF0000'
    }

});

export default styles;