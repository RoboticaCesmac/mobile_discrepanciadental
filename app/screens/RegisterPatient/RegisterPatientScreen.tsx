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
import { collection, addDoc, where, query, getDocs, DocumentData, doc, setDoc } from "firebase/firestore";
import { database } from "@config/firebase";
import { emailExists } from "../../helpers/emailExists";

const RegisterPatientScreen = ({ navigation }: Props) => {
  const [loading, setLoading]= useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const registerNewUser = async () => {
    try{
      setLoading(true);
      //verifica se existe algum paciente com o email recebido como parametro
      await emailExists(email)
        .then( async (boo) => {
          if(boo){
            Alert.alert('Email Inválido','Já existe um paciente cadastrado com este email, por favor use outro email.')
          }
          else{
            let id = doc(collection(database, "patients")).id;

            await setDoc(doc(database, "patients", id), 
            {
              firstName: nome,
              cpf: cpf,
              email: email,
              id: id,
              resultados: {
              }
            }
            );
        
            navigation.navigate("Home");
          }
      });
    }catch(e){
      alert(e)
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
      <Text style={styles.title}>Cadastrar Paciente</Text>
     
          <View style={styles.formContainer}>
            <FormField
              label="Nome"
              value={nome}
              placeholder="Digite o primeiro nome"
              onChangeText={(valor)=>setNome(valor)}
              onBlur={() => {}}
              keyboardType="name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="CPF"
              value={cpf}
              placeholder="Digite o CPF"
              onChangeText={(valor)=>setCpf(valor)}
              onBlur={() => {}}
              keyboardType="name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="Email"
              value={email}
              placeholder="Digite o email"
              onChangeText={(valor)=>setEmail(valor)}
              onBlur={() => {}}
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => registerNewUser()}
            >
              <Text style={styles.submitButtonText}>SALVAR</Text>
            </TouchableOpacity>
          </View>
 
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
      </>
      }
    </View>
  );
};

export { RegisterPatientScreen };
