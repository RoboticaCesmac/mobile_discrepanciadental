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
import * as Yup from "yup";
import { Formik } from "formik";
import { ICredentials } from "../../app/interfaces";


//fonts
import { useFonts } from 'expo-font';
import {
  Ubuntu_400Regular,
} from '@expo-google-fonts/ubuntu';

import AppLoading from "expo-app-loading";

export default function LoginScreen() {
  const [font, setFont] = useState<string>("sans-serif-thin")
  const [styleInputPassword, setStyleInputPassword] = useState<any>(styles.input)
  const [styleInputEmail, setStyleInputEmail] = useState<any>(styles.input)
  const [fontsLoaded] = useFonts({
    'Ubuntu-Regular': Ubuntu_400Regular,
  });

  const load = async () =>{
    await new Promise((resolve)=>setTimeout(resolve, 500));
    setFont('Ubuntu-Regular');
  }

  useEffect(() => {
      load()
  }, []);


  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
  );
  const emailRegex = new RegExp(
    "^(?=[a-z][a-z0-9@._-]{5,40}$)[a-z0-9._-]{1,30}@(?:(?=[a-z0-9-]{1,15}.)[a-z0-9]+(?:-[a-z0-9]+)*.){1,2}[a-z]{2,6}$"
  );
  const validationSchema = Yup.object({
    // email: Yup.string().email("Insira um email").required("Email obrigatório"),
    // password: Yup.string()
    //   .min(8, "Pelo menos 8 caracteres")
    //   .required("Senha obrigatória")
    //   .matches(
    //     passwordRegex,
    //     "A senha deve conter 1 letra minuscula, 1 maiuscula, 1 numero, e 1 caractere especial"
    //   ),
  });
  const navigation = useNavigation();
  //     const [email, setEmail] = useState('');
  //     const [password, setPassword] = useState('');
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  //functions
  const validateLogin = (credentials: ICredentials) => {
    console.log(`email: ${credentials.email}`);
    console.log(`password: ${credentials.password}`);
    if (passwordRegex.test(credentials.password) &&
        emailRegex.test(credentials.email)) 
      {
        setStyleInputEmail(styles.input);
        setStyleInputPassword(styles.input);
        console.log("Password is valid");
        console.log("Email is valid");
    }
    if(credentials.email == "" && credentials.password == ""){
        setStyleInputEmail(styles.input);
        setStyleInputPassword(styles.input);
    }
    if(!passwordRegex.test(credentials.password)){
        console.log("password is invalid");
        setStyleInputPassword(styles.errorBorder);
    }

    if(!emailRegex.test(credentials.email)){
        setStyleInputEmail(styles.errorBorder);
    }

    if(credentials.email == null && passwordRegex.test(credentials.password)){
      setStyleInputEmail(styles.input);
      setStyleInputPassword(styles.input);
    }

    if(emailRegex.test(credentials.email)){
      setStyleInputEmail(styles.input);
    }

    if(passwordRegex.test(credentials.password)){
      setStyleInputPassword(styles.input);
    }


  }
  const loadSignupScreen = () => {
    console.log("loadSignupScreen foi chamada");
    //navigation.navigate('');
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={validateLogin}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
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
                  <Logo width={123} height={124} />
                  <Text
                    style={[styles.header, { fontFamily: font }]}
                  >
                    Seja Bem Vindo
                  </Text>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="E-mail"
                    style={[
                      styleInputEmail,
                      { fontFamily: font },
                    ]}
                  ></TextInput>
                  {errors.email && touched.email && (
                    <Text style={styles.fail}>{errors.email}</Text>
                  )}
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                    placeholder="Senha"
                    style={[
                      styleInputPassword,
                      { fontFamily: font },
                    ]}
                  ></TextInput>
                  {errors.password && touched.password && (
                    <Text style={styles.fail}>{errors.password}</Text>
                  )}
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
                    <Text>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
