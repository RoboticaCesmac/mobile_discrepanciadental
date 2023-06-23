import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  ToastAndroid,
} from "react-native";
import FormField from "../../components/FormField";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usarMascara } from "../../utils/mascara";

export default function TelaCadastrarPaciente(){
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading]= useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const registerNewUser = async () => {

    try{
      setLoading(true);
      if(nome === ""){
        throw new Error("Digite um nome!");
      }else if(cpf === ""){
        throw new Error("Digite um CPF!");
      }else if(cpf.length !== 14){
        throw new Error("Digite um CPF Válido!");
      }else if(email === ""){
        throw new Error("Digite um e-mail!");
      }else if(email.includes("@") === false || email.includes(".") === false){
        throw new Error("Email inválido!");
      }


      let pacientes:any = await AsyncStorage.getItem('pacientes');
      pacientes = JSON.parse(pacientes || "{}");


      
      let id = Date.now()
      
      pacientes[id] = {
        firstName: nome,
        cpf: cpf,
        email: email,
        id: id,
        resultados: {}
      },

      
      await AsyncStorage.setItem('pacientes', JSON.stringify(pacientes));
              
      navigation.navigate("home");
                    




    }catch(e){
          ToastAndroid.showWithGravityAndOffset(
            'Erro! ' + e,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
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
              maxLength={14}
              onChangeText={(valor)=>{
                  valor = usarMascara("CPF", valor)
                  setCpf(valor)
                }
              }
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
 
    
      <StatusBar />
      </>
      }
    </View>
  );
};

