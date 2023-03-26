import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import Logo from "../../../assets/svgs/Logo.svg";
import SigninButton from "../../../assets/svgs/SigninButton.svg";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { ICredentials } from "../../app/interfaces";
import * as NavigationBar from "expo-navigation-bar";

export default function LoginScreen() {
  var validator = require("validator");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string>("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] =
    useState<string>("");


  useEffect(() => {
    navigationConfig();
  }, []);

  const navigationConfig = async () => {
    NavigationBar.setVisibilityAsync("visible");
  };

  const navigation = useNavigation();
  //functions
  const validateLogin = (credentials: ICredentials) => {
    // console.log("Hello world");
    console.log(credentials.password);

    //VALIDATING PASSWORD INPUT
    if (validator.isEmpty(credentials.password)) {
      setPasswordErrorMessage("Campo obrigatório");
      setStyleInputPassword(styles.errorBorder);
    } else if (credentials.password.length < 8) {
      setPasswordErrorMessage("Pelo menos 8 caracteres");
      setStyleInputPassword(styles.errorBorder);
    } else if (validator.isStrongPassword(credentials.password)) {
      setPasswordErrorMessage("");
      setStyleInputPassword(styles.successBorder);
    } else {
      setPasswordErrorMessage("Senha inválida");
      setStyleInputPassword(styles.errorBorder);
    }

    //VALIDATING EMAIL INPUT
    if (validator.isEmail(credentials.email)) {
      console.log("Email valido");
      setStyleInputEmail(styles.successBorder);
      setEmailErrorMessage("");
    } else if (validator.isEmpty(credentials.email)) {
      setStyleInputEmail(styles.errorBorder);
      setEmailErrorMessage("Campo obrigatorio");
    } else {
      setEmailErrorMessage("Email inválido");
      setStyleInputEmail(styles.errorBorder);
    }
  };
  const loadSignupScreen = () => {
    console.log("loadSignupScreen foi chamada");
    //navigation.navigate('');
  };
  //SETTING THE BORDER COLOR OF THE INPUTS
  const [styleInputPassword, setStyleInputPassword] = useState<any>(
    styles.input
  );
  const [styleInputEmail, setStyleInputEmail] = useState<any>(styles.input);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={validateLogin}
    >
      {({ values, handleChange }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.container}>
            <KeyboardAvoidingView>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                }}
                persistentScrollbar={true}
              >
                <View style={styles.card}>
                  <StatusBar style="light" />
                  <Logo width={123} height={124} />
                  <Text style={[styles.header, { fontFamily: "sans-serif" }]}>
                    Seja Bem Vindo
                  </Text>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange("email")}
                      placeholder="exemplo123@email.com"
                      style={[styleInputEmail, { fontFamily: "sans-serif" }]}
                    ></TextInput>
                    {emailErrorMessage.length > 0 && (
                      <Text style={styles.error}>{emailErrorMessage}</Text>
                    )}
                    {emailSuccessMessage.length > 0 && (
                      <Text style={styles.success}>{emailSuccessMessage}</Text>
                    )}
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={true}
                      placeholder="123abcAB#"
                      style={[styleInputPassword, { fontFamily: "sans-serif" }]}
                    ></TextInput>
                    {passwordSuccessMessage.length > 0 && (
                      <Text style={styles.success}>
                        {passwordSuccessMessage}
                      </Text>
                    )}
                    {passwordErrorMessage.length > 0 && (
                      <Text style={styles.error}>{passwordErrorMessage}</Text>
                    )}
                  </View>
                  <Pressable
                    onPress={() =>
                      validateLogin({
                        email: values.email,
                        password: values.password,
                      })
                    }
                  >
                    <SigninButton width={43} height={41} />
                  </Pressable>
                  <TouchableOpacity
                    style={styles.btnSignup}
                    onPress={() => console.log(values.email, values.password)}
                  >
                    <Text
                      style={[
                        styles.signupBtnText,
                        { fontFamily: "sans-serif" },
                      ]}
                    >
                      Cadastre-se
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <StatusBar style="dark" />
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
