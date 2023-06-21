import { View, Text, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { Formik } from "formik";
import FormField from "@components/FormField";
import { AuthValidation } from "./Validation";

import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/StackContainer";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { displayNavigationBar } from '../helpers/displayNavigationBar';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AuthScreenNavigationProp;
};

interface FormValues {
  email: string;
  password: string;
}

const AuthenticationScreen = ({ navigation }: Props) => {
  const [loading, setLoading]= useState<boolean>(false);
  useEffect(() => {
    displayNavigationBar();
  }, []);
  const handleAuth = async (values: FormValues) => {
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => navigation.navigate("Home"))
        .catch((err) => {
          switch (err.code) {
            case "auth/user-not-found" || "auth/wrong-password":
              Alert.alert(
                "Verifique suas credenciais",
                "Usuário ou senha incorreta"
              );
              break;
            case "auth/too-many-requests":
              Alert.alert(
                "Ocorreu um erro",
                "Muitas tentativas. Aguarde antes de tentar novamente."
              );
              break;
            default:
              Alert.alert("Ocorreu um erro", err.code);
          }
        });
      }catch(e){
        alert(e);
      }finally{
        setLoading(false);
      }
  };

  return (
    <View style={styles.container}>
      {loading == true &&
        <ActivityIndicator size={100} color="#000000" />
      }
      {loading == false &&
      <>
      <Text style={styles.title}>Seja bem vindo</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleAuth}
        validationSchema={AuthValidation}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <FormField
              label="Email"
              value={values.email}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="Senha"
              value={values.password}
              placeholder="Digite uma senha"
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ position: "absolute", bottom: 30 }}>
        <Text>
          Novo Usuário?
          <Text
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            {" "}
            Cadastre-se
          </Text>
        </Text>
      </View>
      </>
      }
    </View>
  );
};

export { AuthenticationScreen, Props };
