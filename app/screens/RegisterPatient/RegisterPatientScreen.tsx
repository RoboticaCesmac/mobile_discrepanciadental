import { Props } from "@screens/AuthenticationScreen";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Formik } from "formik";
import FormField from "@components/FormField";
import styles from "@screens/styles";
import { RegisterPatientValidation } from "../Validation";
import { collection, addDoc, where, query, getDocs, DocumentData } from "firebase/firestore";
import { database } from "@config/firebase";
import { emailExists } from "../../helpers/emailExists";

interface FormValues {
  email: string;
  firstName: string;
  surName: string;
}

const RegisterPatientScreen = ({ navigation }: Props) => {

  const registerNewUser = async (credentials: FormValues) => {
    console.log(credentials);

    //verifica se existe algum paciente com o email recebido como parametro
    emailExists(credentials.email)
      .then( async (boo) => {
        if(boo){
          Alert.alert('Email Inválido','Já existe um paciente cadastrado com este email, por favor use outro email.')
        }
        else{
          const docRef = await addDoc(collection(database, "patients"), {
            firstName: credentials.firstName,
            surName: credentials.surName,
            email:credentials.email
          });
          console.log(docRef)
          navigation.navigate("Home");
        }
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Paciente</Text>
      <Formik
        initialValues={{ firstName: "", surName: "", email: "" }}
        onSubmit={registerNewUser}
        validationSchema={RegisterPatientValidation}
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
              label="Nome"
              value={values.firstName}
              placeholder="Digite o primeiro nome"
              onChangeText={handleChange("firstName")}
              onBlur={() => handleBlur("firstName")}
              error={
                touched.firstName && errors.firstName
                  ? errors.firstName
                  : undefined
              }
              keyboardType="name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="Sobrenome"
              value={values.surName}
              placeholder="Digite o sobrenome"
              onChangeText={handleChange("surName")}
              onBlur={() => handleBlur("surName")}
              error={
                touched.surName && errors.surName ? errors.surName : undefined
              }
              keyboardType="name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="Email"
              value={values.email}
              placeholder="Digite o email"
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
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
      {/* <View style={{ position: "absolute", bottom: 30 }}>
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
      </View> */}
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

export { RegisterPatientScreen };
